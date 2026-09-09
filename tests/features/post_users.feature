# Test untuk POST Users - reqres.in

Feature: Create New User
    As a test engineer
    I want to test user creation functionality
    So that I can verify new users can be created via API

    Scenario: Create user with valid random data
        Given I have a valid create user endpoint
        When I add a user with random data
        And I make a POST request to create user
        Then the response status should be created successfully
        And the created user should contain "id"

    Scenario: Verify user creation contains required fields
        Given I have a valid create user endpoint
        When I add a user with random data
        And I make a POST request to create user
        Then the response status should be created successfully
        And the created user should contain "name"
        And the created user should contain "email"
        And the created user should contain "createdAt"
