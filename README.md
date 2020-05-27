# Hovrtek Drone Services

## Warnings on app
* "Virtualized lists should never be nested inside plain scrollviews with the same orientation" error on PilotProfileSetupPageOneScreen
* "possilbe unhandled promise rejection id:0" on PilotProfileSetUpPageOneScreen
* "Require cycle: components/DatePicker.js -> screens/pilot/PilotProfileSetupPageTwoScreen.js -> components/DatePicker.js /n Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle." on pilot home page

## Things to keep in mind / todo

* Deep look at conditional rendering between ios / android

* accessibility - our app is not accessible right now

* need to handle exceptions related to users not existing on projects they already made, etc.


* auth headers need to be sorted out - Back button upon Sign up goes back to Landing page as oppsed to signin Screen. 

* Make new Landing page for New Projects saying something like "WELCOME, MAKE A PROJECT"



## Bugggs!

#### Baffling Code Gnome Bugs

* Mysterious "doesn't load upon SignUp unless you tap the white, blank screen" issue
_does not seem to be an issue after this auth refactor, at least for Lee (also uninstalled and reinstalled expo recently)_

* Fix part-time uploader. Probably wait for Franks refactor.

* back button in sign up stack skips back to sign in page no matter how far in the stack you are (?)

#### Bugs We Should Know How to Fix

* Touchable opacity on ProjectList all "Glow" upon touch, only selected should do so.

* Upon scrolling on ProjectList all projects "Glow".

* Bring Keyboard up at same time as as modal, eliminating the step of pressing the input to bring the keyboard up

* Bug on ClientLocationPicker. Intial state is set to "where is the location of your drone service" of in TextInput when it should be blank.

#### Strictly Styling Bugs

* WhichSignUpScreen
PilotSignUpScreen
ClientSignUpScreen
Either make page static without <ScrollView> if possible, or stop the scroll "overlap after scrolling" from showing the White Background. Should scroll no further that the background image


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

 * APP BREAKING ISSUE: Back Button on PilotProfile is Unclickable iPhone 7 

 * Weird hiccup in Subheader CSS when navigating from ProjectsListScreen to MyJobsScreen - the subheader "clicks" down on animation...

 * on JobDetailsScreen on Pilot Side, back button is pushed down so "Back" is unclickable if a job description details are too long. Wrap page in <ScrollView>????

 * ChatScreen Input should be sticky / static and independant of the <ScrollView>

* PilotSignUpScreen
ClientSignUpScreen
Sign Up Button as opposed to text??

* CSS on AboutScreen is jacked on iPhone 7 view. White bar on bottom, header text in lousy location.
_same in android google pixel_

* CSS on SupportScreen is jacked on iPhone 7 view. White bar on bottom, header text in lousy location.
_no white bar in android google pixel, but styling still not ideal_

* CSS on PilotProfileWelcomeScreen (after completion) on iPhone 7 is jacked. Can't see below "No Industry Details" _not sure about no industry details thing? but seems to be just fine on android google pixel, although still needing some more styling probably_

* MessagingScreen functional, albiet a little bland? Anyone got an idea to gussy it up?

* ClientNewProjectScreen forms
PilotProfileSetupPageOne forms


 - change modal to cover either more of the screen or blur the background upon opening.
 - make a Choose Button as opposed to "choose" text??

 #### Android Only
 * ~~footer moves up and gets in the way when keyboard appears~~ footer now disappears but is there for a split second - better but still not satisfactory
 *  the back button is a blank white square
 * clicking on some things just doesn't work - notifications particularly

 #### iOS Only

