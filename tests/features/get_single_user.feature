# Test untuk GET Users by ID - reqres.in

Feature: Get Single User by ID
    As a test engineer
    I want to test GET single user functionality
    So that I can verify the API returns individual user data

    Scenario: Verify get valid user by ID
        Given I have a valid users endpoint
        When I make a GET request to users by ID "2"
        Then the response status should be 200
        And the response should contain paginated data

    Scenario: Verify get non-existent user returns error
        Given I have a valid users endpoint
        When I make a GET request to users by ID "9999"
        Then the response status should be 404
        And the response should be of type "object"
