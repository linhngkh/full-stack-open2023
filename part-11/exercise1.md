1. Some common steps in a CI setup include linting, testing, and building. There are some specific tools for taking care of these steps in the ecosystem:
- ESLint: which is a popular linting tool for JavaScript. It can detect and report various types of issues in your JavaScript code, such as unused variables, missing semicolons, inconsistent indentation, and more. It also allows you to customize the linting rules based on your project's specific requirements.
- Cypress: is an end-to-end testing framework for testing the entire application flow from the user's perspective. It allows you to write E2E tests that run in a real browser and simulate user interactions. It is particularly useful for testing user interactions, form submissions, and navigation flows.
- Webpack: is a popular building tool in the JavaScript ecosystem, mainly used for bundling and optimizing web assets like JavaScript, CSS, and images.

2. The alternatives to set up the CI besides Jenkins and GitHub Actions are Bitbucket pipelines, GoCD, Google Cloud Build, and so on.

3. The decision to choose between a self-hosted or a cloud-based CI environment depends on various factors, and both options have their advantages and considerations. To make an informed decision, you would need to consider the following information:
- Resource Requirements:
- Scalability
- Maintenance and Administration
- Cost Considerations
- Integration with Version Control and Tools
- Geographical Distribution and Accessibility
- Backup and Disaster Recovery

In summary, a cloud-based CI environment is often preferred for smaller teams, projects with fluctuating resource demands, projects with limited maintenance capabilities, and when rapid scalability is required. On the other hand, a self-hosted CI environment might be more suitable for larger teams, projects with specific hardware or security requirements, and projects where full control over the infrastructure is essential.