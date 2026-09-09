# Test untuk GET Users (List Users) - reqres.in

Feature: Get Users List
    As a test engineer
    I want to test GET users list functionality
    So that I can verify the API returns paginated user data

    Scenario: Verify GET users list response structure
        When I make a GET request to users list
        Then the response status should be 200
        Then the response should contain paginated data
        And the response should be of type "object"

    Scenario: Validate users list contains valid user data
        When I make a GET request to users list
        Then the response status should be 200
        Then the response should contain paginated data
        And the response data field should be an array
