import React from "react";
import Footer2 from "./Footer2";
import Navigation from "./Navigation";

const Privacy = () => {
  return (
    <div>
  
      <h1 className=" mt-10 text-5xl font-bold w-full text-center">
        Privacy Policy
      </h1>

      <div className=" my-10 w-full px-3 lg:px-0 flex items-center justify-center">
        <div className=" w-full lg:w-1/3 new_class p-4">
          <h5 className=" font-semibold text-xs w-full text-left"> Your personal data </h5>

          <p className=" pb-2 text-xs font-medium text-left">
            Here at SafeTag we are dedicated to protecting the privacy of our customers. In accordance with EU’s General Data Protection Regulation (GDPR), we use the data collected about our customers lawfully and only to process their purchases and provide the best quality service possible.
            Upon logging in to www.safetagtracking.com, several cookies will be created to remember your login information to speed up and ease the login process. This data is encrypted and protected.
            SafeTag stores your username/email and password for login purposes. SafeTag also stores your name, if you enter this during your registration.
            We do not store bank/credit card details and all payments are encrypted and processed using Stripe, available here: https://stripe.com/gb . Your information is not shared with any third parties. All payment information is handled via Stripe and SafeTag will not hold or receive any of this 
          </p>
          <h5 className=" font-semibold text-xs w-full text-left">Geo-location Data</h5>
          <p className=" pb-2 text-xs font-medium text-left">
            Geo-location data collected by SafeTag branded GPS tracking equipment is saved for the last three months and is accessible in-app or via the website. This data is encrypted and secured within MongoDB Atlas database infrastructure, your personal 3-month location history is only accessible from your account, however the use of non-personal aggregated data may be shared with other parties for the purpose of analysis and to improve our service. We will not use or share this data for any other purpose.
            Data from both your smartphone(app) and computer(website) is used to determine your geographic location for the sole purpose of displaying this information to you via each of these channels. You will have authorised this in-app and on our website. Also, we may use it for statistics analysis and share that non-personal aggregated data with other parties. We will not use or share this data for any other purpose.
            If you do not want us to use your location for the purposes set forth above, you should switch off location permissions for the SafeTag Mobile Application or Website in your phone or web browser settings. This will no longer display the location of your smartphone. 
          </p>
          <h5 className=" font-semibold text-xs w-full text-left">E-mail marketing practices</h5>
          <p className=" pb-2 text-xs font-medium text-left">
            You may opt-out from any email marketing by using the unsubscribe links at the bottom of the marketing emails or in your account preferences.
          </p>
          <h5 className=" font-semibold text-xs w-full text-left">Contacting Us</h5>
          <p className=" pb-2 text-xs font-medium text-left">
            When you contact us via contact form or e-mail, your personal data is collected. The data collected is shown as listed in the respective contact form. This data is stored and used exclusively for the purpose of responding to your request or for establishing contact and for applying technical assistance.  
          </p>
        </div>
      </div>
      <Footer2/>
    </div>
  );
};

export default Privacy;