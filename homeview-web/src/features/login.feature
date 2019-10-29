Feature: Login features
  Scenario: Show the login page as default
    Given: I load the app
    When I go to the root page
    Then I see the login page
    And I am logged out

  Scenario: Show log out when I am logged in
    Given: I load the app
    When I go to the root page
    Then I should see the logout link

  Scenario: Logging in successfully
    Given: I load the app
    When I go to the root page
    And I log in with valid credentials
    Then I see that I am logged in
    
