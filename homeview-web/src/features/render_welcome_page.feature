Feature: render the basic welcome page
  Scenario: Show the welcome message
    Given: I load the app
    When I go to the root page
    Then I see the login page
    And I am logged out
    
