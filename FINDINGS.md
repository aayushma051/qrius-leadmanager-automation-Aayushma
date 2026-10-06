# Findings

## Finding 1: Valid admin login does not navigate to Leads

* **Test:** Admin can sign in and reaches the Leads page
* **Result:** Failed
* **Judgment:** The application has a bug
* **Reason:** The test used the provided valid admin credentials, but after clicking Login the application remained on `/login` instead of navigating to `/leads`.

## Finding 2: Valid agent login does not navigate to Leads

* **Test:** Agent can sign in and sees their role
* **Result:** Failed
* **Judgment:** The application has a bug
* **Reason:** The test used the provided valid agent credentials, but after clicking Login the application remained on `/login` instead of navigating to `/leads`.

## Finding 3: Wrong-password error message differs from prediction

* **Test:** Wrong password shows an error and stays on the login page
* **Result:** Failed
* **Judgment:** My test is wrong
* **Reason:** The application displayed `Login failed`, while my test expected `Invalid username or password`.
