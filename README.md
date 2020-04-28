# Hovrtek Drone Services

## Styling bugs

### Android
* ~~footer moves up and gets in the way when keyboard appears~~ footer now disappears but is there for a split second - better but still not satisfactory
*  the back button is a blank white square

### iOS
* keyboard needs to push forms up

### Both
* auth headers need to be sorted out


## Other Bugs
* Embedded image is SLOW to load on Client Support Screen / Client About Page

## Warnings on app
* "Virtualized lists should never be nested inside plain scrollviews with the same orientation" error on PilotProfileSetupPageOneScreen
* "possilbe unhandled promise rejection id:0" on PilotProfileSetUpPageOneScreen
* "Require cycle: components/DatePicker.js -> screens/pilot/PilotProfileSetupPageTwoScreen.js -> components/DatePicker.js /n Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle." on pilot home page


## Possible bugs?

* on Lee's phone, toggling between tabs sometimes doesn't work

## Things to keep in mind

* Dropdown clean up on PilotProfileSignupForms
* Deep look at conditional rendering between ios / android
* accessibility - our app is not accessible right now
* need to handle exceptions related to users not existing on projects they already made, etc.
