# tests/e2e/features/blog.feature
Feature: Blog Post Reader Experience
  As a reader
  I want to view a beautifully formatted blog post
  So that I can read the content, share it, and leave comments

  Scenario: Loading a blog post successfully
    Given I navigate to the blog post "first-post"
    Then the blog post title should be "First Post!"
    And the main article content should be visible
    And the share and comment interactions should be available