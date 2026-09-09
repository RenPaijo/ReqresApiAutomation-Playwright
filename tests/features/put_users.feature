# Test untuk PATCH Users - reqres.in

Feature: Update User Information
    As a test engineer
    I want to test user update functionality
    So that I can verify existing users can be updated via API

    Scenario: Update user with valid patch data
        Given I have a valid update user endpoint
        When I prepare updated data for user
        And I make a PUT request to update user with ID "2"
        Then the response status should be updated successfully
        And the updated user should reflect the new changes

    Scenario: Verify user update contains timestamp
        Given I have a valid update user endpoint
        When I prepare updated data for user
        And I make a PUT request to update user with ID "5"
        Then the response status should be updated successfully
        And the updated user should contain "updatedAt"
