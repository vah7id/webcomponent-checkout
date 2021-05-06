# Coding Challenge check-out flow

### Welcome fellow coder!

![Fellow Coder](https://media.giphy.com/media/OIEhvGRByVrHO/giphy.gif)

<br/>

#### Introduction

Thanks again for applying for the lead front-end position within our team.
We are very happy to have you as one of the candidates in the race for the vacancy!

For the last step for the interviews, we have asked you to perform a coding challenge to show your skills when it comes to "talking code".

At the end of this assignment you have the opportunity to present on your results.

#### Getting started:

To get started, please create a new public repo and add commit your code there. Once you have created the repo for this challenge please send us a link to your repo.

#### Before you start

A few things that you should know before you start:

- Please read through the entire challenge before starting.
- You have one week to finish the challenge.
- Tag the final commit of each phase completed.
- Make use of Rollup for as the module bundler.
- Make use of our open source library Lion-web https://github.com/ing-bank/lion

We would like to understand how you approach your solution incrementally by also looking at your commit history.
Please make sure that your commits are ordered logically and described appropriately, and it’s not just a big commit with all the changes.

Quality is highly appriciated! We are looking for a lead engineer and we believe the candidate should be able to lead by example.

#### Challenge description: Create a check-out flow for an e-commerce platform

###### Background

You are selected to improve the check-out journey for an e-commerce solution. The webshop is build a few years ago and the check-out journey is not converting well.
The customer Journey Experts did their discovery and want to refactor the pages to a online flow. As IT we want to step-up and use the latest modern web standards.

With that said I guess it's time to start. We'll try do this in phases.

###### Phase 1: Create an empty skeleton for the flow we are going to create.

Step 1: Your basket overview
Step 2: The Delivery Address
Step 3: The Payment
Step 4: Confirmation of the order

The Scenario's

- User navigates to the basket the flow should be visible and step one should be active.
- User navigates to the basket their should be no previuous button in the flow actions.
- User navigates to the basket and goes to step 2: There is a next button and a previous button.
- User navigates to the basket and goes to step 3: There is no next button.
- User navigates to the basket and goes to step 3: There is a button to confirm a payment.
- User navigates to the basket and goes to step 4: There is no next/previous button.
- User navigates to the basket and goes to step 4: There is should be a button navigating back to the homepage

###### Phase 2: Retrieve the basket.

Now we got the flow working! Awesome! So let's go on..
We need to fill the flow with content. We don't want to be depeneded on the other API team who is delivering the API, so we decided to use mocks to prevent us from getting blocked in our delivery.

In this phase we are going preview the basket items to the customer in the first step.

The Scenario's

- In step 1 of the basket flow, there should be a list of products (SKU's) retrieved from the API.
- We should show information about the quantity per SKU in the basket, we should show the title, we should show the delivery time.
- Order the list on fulfillmentType.
- If we have no items in the basket or remove the last item we should show an empty basket message and show a button to navigating back to the homepage.
- There should be a next button which guides you to the Delivery Address of the customer.

###### Phase 3: Where should we ship the order to?

Until now the customer is able to view his basket in the flow.
For step 2 in the flow we need to get the delivery address to ship the order we should get this data from our API (See JSON Customer Resource).

The Scenario's

- If there is no address in our system we should provide input fields to enter a delivery address.
- If we have the address of the customer in our systems we are going to prefill the address.
- The customer should be able to change the prefilled delivery address.
- There should be a previous button, navigating back to the basket overview (step 1).
- There should be a next button which is confirming the payment.
- If the basket contains a Voucher only we don't need the home address but only the e-mail of the customer.
- The customer should be able to change the prefilled e-mail address.

###### Phase 4: Let's create a payment step in the flow.

For this stage we would like for you to propose how a checkout flow should be like.
Based on the requirements below, specify the endpoints and their mock responses to fulfill the functionality

The scenario's:

- When the customer enters this step we reserve the basket in our systems.
- We should be able to retrieve the customers bank account.
- We should validate if the account balance is enough to purchase.
- If the customer's submits the payment there are some processes to be done we should confirm the reserved basket in the API. The API will process the order.
- Now that the customer performed the payment, we can navigate to step 4 in the flow.

###### Phase 5: Show the confirmation.

In this flow we want to thank the customer for the order and show an overview of the order information.

The scenario's: 

- When the payment is performed step 4 should be active.
- We should thanks the customer for the order.
- We should show the basket items to the customer.
- We should show the delivery address
- We should show a proceed to home-page button on this step.

###### Phase 6 Let's build a better Customer Journey. Add options to modify the basket in the flow.

The scenario's

- There should be an option to increase the quantity per SKU
- There should be an option to decrease the quantity per SKU
- Increasing button should be disabled when we reached the # avaialble stock
- The customer should be able to remove the basket line

###### Phase 7: On the confirmation group the items in the order by delieveryTime.

For example:

[[basket item delivery time]]
Product x
Product y

[[basket item delivery time]]
product z

###### Phase 8: 10% Discount on 3 SKU's or more in the basket

The scenario's

- If the basket contains 3 of more SKU's you will get 10% discount

#### Finally:

After we had time to review your awesome solution we will get back to you.

![You Can Do IT!](https://media.giphy.com/media/yoJC2K6rCzwNY2EngA/giphy.gif)

##### Good luck and have fun!

##### Mock data

- Basket Resource
  {"basket":[{"productId":1226739,"skuId":301526,"deliveryTime":"Dit product ontvang je direct in je mailbox","fulfillmentType":"VOUCHER","phoneNumberRequired":false,"ageRestriction":false,"title":"My first voucher","price":0,"availableStock":1,"mediaUrl":"/punten/media/file/19470777.jpg","quantity":1,"extraCostValue":0},{"productId":1007404,"skuId":302396,"deliveryTime":"Binnen 5 werkdagen in huis","fulfillmentType":"DROP_SHIP","phoneNumberRequired":false,"ageRestriction":false,"title":"Kneipp Home Fragrances Pakket","price":26,"availableStock":4,"mediaUrl":"/punten/media/file/23547936.jpg","quantity":1,"extraCostValue":0},{"productId":1006739,"skuId":301586,"deliveryTime":"Dit product ontvang je direct in je mailbox","fulfillmentType":"VOUCHER","phoneNumberRequired":false,"ageRestriction":false,"title":"Philips Hue 20% kortingsvoucher","price":0,"availableStock":301,"mediaUrl":"/punten/media/file/19470777.jpg","quantity":1,"extraCostValue":0}],"basketSummary":{"quantity":2,"price":26,"extraCostValue":0,"totalPrice":26}}

- Customer Resource
  -- Scenario 1: We don't have an customer address
  HTTP Response 404 - Resource not found

-- Scenario 2:
{"correspondenceName":"Hr J Ritsma", "addresses":[{"addressIndex":1,"street":"Pietje puk straat","houseNumber":"6","houseNumberAddition":"","postalCode":"1335HK","city":"Almere"}],"personalEmailAddress":"j.ritsma@ing.com","phoneNumber":"0031-123456789"}
