## SharpStakes React Native App

https://github.com/user-attachments/assets/93c0ab18-bbe6-466f-8210-1f06b6969f78

## App Video from Physical Device

https://github.com/user-attachments/assets/2cef5b19-9ed5-48c6-865d-39b7a11fa993

## Setup and Running Instructions for SharpStakes App

1. Prerequisites
   
   Ensure the following are installed on your system:<br />
      * Node.js<br />
      * Xcode (for running the iOS app)<br />
      
2. Install App Dependencies
   
   1.Navigate to the root folder of the project where all the source code is located.
   
   2.Run the following command to install dependencies:
   
   ```
   npm install
   ```
   
3. Run the iOS App
   
   * Open Xcode.
     
   * In Xcode, open the workspace file located at:
     
     ```
     ios/SharpStakes.xcworkspace
     ```
     
   * Select a simulator and Run the app.
     
   * The app should build and launch successfully on the simulator.
     
4. Start the Backend Server
   
   Inside the main project folder, go to the server directory:
   
   ```
   cd server
   ```
   
   Install server-side dependencies:
   
   ```
   npm install
   ```
   
   Start the backend server:

   ```
   node server.js
   ```

   Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

6. Load Data into the App

   After the server is running, reload the app in the simulator.

   The initial loading screen appears only once, as it fetches the data for the first time.

   Once loaded, the app will display all match data categorized as:

     * Scheduled

     * In Progress

     * Final

7. App Features
   
   Game Dashboard: View all matches with their statuses.

   Game Detail Screen: Tap on any match to view detailed information.

   Profile Screen: Displays user profile and matched details.

## What I have used

   * React Native – For building the cross-platform mobile application.

   * Xcode – To run and manage the iOS build process.

   * iOS Simulator – For testing the app in a simulated environment.

   * Physical iPhone Device – For real-device testing to ensure performance and UI consistency.

   * AI Tools (ChatGPT) – Assisted in writing reusable code, cleaning up logic, and applying proper naming conventions across 
     components.

Happy Coding :)





