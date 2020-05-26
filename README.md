# Hovrtek Drone Services

## Styling bugs

### Android
* ~~footer moves up and gets in the way when keyboard appears~~ footer now disappears but is there for a split second - better but still not satisfactory
*  the back button is a blank white square
* clicking on some things just doesn't work - notifications particularly

### iOS
* ~~keyboard needs to push forms up~~

### Both
* auth headers need to be sorted out


## Other Bugs
* Embedded image is SLOW to load on Client Support Screen / Client About Page
* image just sometimes doesn't upload. Doesn't throw an error either

## Warnings on app
* "Virtualized lists should never be nested inside plain scrollviews with the same orientation" error on PilotProfileSetupPageOneScreen
* "possilbe unhandled promise rejection id:0" on PilotProfileSetUpPageOneScreen
* "Require cycle: components/DatePicker.js -> screens/pilot/PilotProfileSetupPageTwoScreen.js -> components/DatePicker.js /n Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle." on pilot home page


## Possible bugs?

* back button in sign up stack skips back to sign in page no matter how far in the stack you are (?)

## Things to keep in mind

* Dropdown clean up on PilotProfileSignupForms
* Deep look at conditional rendering between ios / android
* accessibility - our app is not accessible right now
* need to handle exceptions related to users not existing on projects they already made, etc.


* Open keyboard automatically when inputting work experience on pilot sign up form

* Change Landing page on Client side to be CREATE NEW PROJECT instead of Projects.
* Make new Landing page for New Projects saying something like "WELCOME, MAKE A PROJECT"
* Remove Account, Services and Location from CLIENT SIDE NAV STACK

* Touchable opacity on ProjectList all "Glow" upon touch, only selected should do so.

* Upon scrolling on ProjectList all projects "Glow". 

* Bring Keyboard up at same time as as modal, eliminating the step of pressing the input to bring the keyboard up

* 
WhichSignUpScreen 
PilotSignUpScreen 
ClientSignUpScreen
Either make page static without <ScrollView> if possible, or stop the scroll "overlap after scrolling" from showing the White Background. Should scroll no further that the background image

* 
PilotSignUpScreen
ClientSignUpScreen
Sign Up Button as opposed to text??

* Mysterious "doesn't load upon SignUp unless you tap the white, blank screen" issue

* CSS on AboutScreen is jacked on iPhone 7 view. White bar on bottom, header text in lousy location. 

* CSS on SupportScreen is jacked on iPhone 7 view. White bar on bottom, header text in lousy location. 

* CSS on PilotProfileWelcomeScreen (after completion) on iPhone 7 is jacked. Can't see below "No Industry Details"

* MessagingScreen functional, albiet a little bland? Anyone got an idea to gussy it up?

* Bug on ClientLocationPicker. Intial state is set to "where is the location of your drone service" of in TextInput when it should be blank. 

* ClientNewProjectScreen forms
PilotProfileSetupPageOne forms

 - change modal to cover either more of the screen or blur the background upon opening. 
 - make a Choose Button as opposed to "choose" text??

 * Fix part-time uploader. Probably wait for Franks refactor. 

 * Top gray framing bar on Pilot side is off.

 * Back Button on Pilot Profile is Unclickable iPhone 7