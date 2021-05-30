import UserService from '../services/UserService';
import User from '../models/User';
import axios from 'axios';
import EmailService from './EmailService';

const cowinResourceUrl =
  'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict';
const userService = new UserService(new User().getInstanceWithoutInit());
const emailService = new EmailService();
class CowinService {
  constructor() {
    this.users = [];
    this.notificationSent = {};
    this.refreshUsers();
    setInterval(() => {
      this.getDataForEachUser();
    }, 600000);
    this.getDataForEachUser();
  }

  async refreshUsers() {
    const response = await userService.getAll({});
    if (response.error) {
      //Problem - try again after some time
      await new Promise((resolve) => setTimeout(resolve, 60000));
      await this.refreshUsers();
    } else {
      this.users = response.data;
      await new Promise((resolve) => setTimeout(resolve, 60000));
      await this.refreshUsers();
    }
  }

  getCurrentDate() {
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }
    return `${dd}-${mm}-${yyyy}`;
  }

  //Slots for 18+
  giveMe18PlusSlots(data) {
    let centerDetails = '';
    data['centers'].forEach((center) => {
      let centerDetailsTemp = `<h3>Center Name: ${center.name}<h3> 
        <h3>Address:  ${center.address} ${center.state_name} ${center.district_name}<h3>
        `;
      let sessionDetails =
        '<table><th>Date</th><th>Capacity></th><th>Vaccine</th><th>Fee</th>';
      center.sessions.forEach((session) => {
        if (session.min_age_limit === 18 && session.available_capacity > 2) {
          console.log(session.min_age_limit);
          sessionDetails += `<tr>${session.date}</tr>
                <tr>${session.available_capacity}</tr>
                <tr>${session.vaccine}</tr>
                <tr>${center.fee_type}</tr>
                `;
        }
      });
      if (sessionDetails.length) {
        centerDetails += centerDetailsTemp + sessionDetails + '</table>';
      }
    });
    return centerDetails;
  }

  async getDataForEachUser() {
    //Call cowin apis
    if (this.users.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return this.getDataForEachUser();
    }
    for (const user of this.users) {
      let slotsChanged = false;
      let districtData = [];
      for (const { id, payload } of user.districts) {
        //Wait for 3s before next api call
        console.log('District Id: ', id);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        try {
          const res = await axios.get(
            `${cowinResourceUrl}?district_id=${id}&date=${this.getCurrentDate()}`,
            {
              Host: 'cdn-api.co-vin.in',
              headers: { 'User-Agent': 'Chrome/90.0.4430.93' },
            }
          );

          const eighteenPlusSlots = this.giveMe18PlusSlots(res.data);
          districtData = [...districtData, { id, payload: eighteenPlusSlots }];
          if (eighteenPlusSlots.length && eighteenPlusSlots !== payload) {
            const emailString = eighteenPlusSlots;
            slotsChanged = true;
            if (emailString.length) {
              emailService.sendEmail(user.email, emailString);
            }
          }
        } catch (error) {
          console.log(error);
        }
        console.log('District Id: ', districtData.length);
      }
      console.log('Slot changed: ', slotsChanged);
      if (slotsChanged) {
        userService.update(user._id, { user, districts: districtData });
      }
    }
  }
}

export default new CowinService();
