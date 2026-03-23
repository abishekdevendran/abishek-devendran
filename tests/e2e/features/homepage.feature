# tests/e2e/features/homepage.feature

Feature: Portfolio Homepage
  As a visitor
  I want the homepage to load successfully
  So that I can view Abishek's portfolio and blog

  Scenario: The homepage loads and displays the correct title
    Given I open the local dev server
    Then the page title should contain "Abishek"