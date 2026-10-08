# Findings

### Search - Company Name

- **Test:** Searching by company name narrows the list
- **Result:** Failed
- **Verdict:** The application has a bug.
- **Reasoning:** Searching for the existing company "HimalKart" does not filter the lead list to the matching lead.


### Search - Lead Count

- **Test:** Lead count updates after searching
- **Predicted:** After searching for "Sita Sharma" and displaying one matching lead, the count should update to show 1 out of 12 leads.
- **Actual:** One lead is displayed, but the count still shows "Showing 12 of 12 leads".
- **Verdict:** The application has a bug.
- **Reasoning:** The search correctly filters the displayed lead, but the count does not update to reflect the filtered results.


### Add Lead - Status

- **Predicted:** After adding a lead with status Qualified, its row should show status Qualified.
- **Actual:** The lead is added, but its row shows status New.
- **Verdict:** The application has a bug.
- **Reasoning:** The frontend defaults the lead status to New instead of saving the status selected by the user.


### Delete Lead

- **Predicted:** After the admin deletes a lead, it should no longer appear in the leads list.
- **Actual:** The test initially depended on a seeded lead, which was deleted on the first run and caused the test to fail on subsequent runs because the lead no longer existed.
- **Verdict:** My test was wrong.
- **Reasoning:** The application deleted the lead correctly. The test depended on shared seed data that was modified by the test. The test was updated to create its own lead and delete that lead instead.


### Codegen + Trace Viewer

- **Flow:** Admin login and search for an existing lead.
- **Result:** Passed in Chromium, Firefox, and WebKit.
- **Finding:** The Codegen-generated test was cleaned up to use the existing Page Object Model and test data.
- **Trace Viewer:** Not required because the cleaned test passed in all browsers.