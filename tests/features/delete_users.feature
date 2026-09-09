# Test untuk DELETE Users - reqres.in

Feature: Delete User Account
    As a test engineer
    I want to test user deletion functionality
    So that I can verify users can be removed via API

    Scenario: Delete user with valid ID
        Given I have a valid delete user endpoint
        When I make a DELETE request to delete user with ID "7"
        Then the response status should be deleted successfully

    Scenario: Delete non-existent user returns appropriate response
        Given I have a valid delete user endpoint
        When I make a DELETE request to delete user with ID "9999"
        Then the response status should be deleted successfully
