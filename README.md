# DecentraJobs
**DecentraJobs ** is a freelancing platform built on top of the Near platform, Allowing users to either hire skilled freelancers for jobs as well find interesting jobs in many fields and get hired.

Current version has very basic and bare-bones functionality.

![Screen Shot 2022-03-18 at 21.17.01.png](https://user-images.githubusercontent.com/62159014/159064120-edd966cf-1312-422b-aa2d-38a54912fa83.png)
# Cloning the repo
After cloning the project please run

```
yarn install
```
in order to install all of the necessary packages for the project to run correctly.

# Building and deploying the contract

The contract is located in under the contract/assembly folders, after editing the contract you can run

```
yarn build-contract
```
in order to build the contract and get the .wasm file , if you want to build and deploy the contract at the same time, you can run

```
yarn deploy-contract
```
This will create a test account and deploy the contract into it.

after the contract is deployed, it is necessary to run the following command in the terminal in order to be able to run the contract

**This step is not needed if you are going to use the contract with the front-end**

export CONTRACT=ACCOUNT_ID
where the ACCOUNT_ID will be returned after the contract deployment

## Web3 Storage API
In order to be able to use the app correctly, create an account on [web3.storage](https://web3.storage/) and generate an api key.

create a **.env.local** file in the root of the project and fill it accordingly:
```
NEXT_PUBLIC_STORAGE_API = "API_KEY"
```


## How Does It Work? (Theory)
**As a job creator: ** After creating an account in DecentraJobs, anyone can create a job and hire freelances. While creating a job, the funds will be stored onto the smart contract in order to ensure that payment will happen upon job completion.

**As a freelancer: ** Freelancers can browse the available list of jobs freely and apply to any job that they they are upto, optimally all jobs will have the necessary details such as expectations, payment , as well as a project brief that explains more about the job in detail.

## How Does It Work? (Technical)

These following technologies have been used in this project:
1. [NextJS](https://nextjs.org): used as a front-end for the project
2. [Recoil](https://recoiljs.org) : used as a state management solution for the proejct
3. [We3Storage](https://web3.storage) : used to store all files such as images, pdfs , and zip files in a decentralized fashion.
4. [Near](https://near.org) : Used to to handle authentication , payment , as well as storing all of the user profile , project data on chain.


## Potential Features
Due to the short time this app was developed in, there are many features that were desired to be in the project but were left out.

So this is a general To-Do list that will hopefully be added to the project as soon as possible.

* [ ] Built-in chat : This allows the users to communicate with each other within the app itself, making it more convinient for both people hiring and freelancers.
* [ ] In-Chat offers : Once getting in contact with project owners, freelancers can submit their own offer directly from the chat , giving them an easy way to ask for they want when negotiating projects.
![9a85576ec9ee41578d2fe29e13c5243b.png](https://user-images.githubusercontent.com/62159014/159063888-b8871e21-6b78-4d67-9db9-58cf61b7a2fa.png)
* [ ] Milestone payment : instead of a one payment at the end of the project, project owner and freelancers can agree to split the total payment to as many steps as they want, Each payment transfered to the freelancer directly as soon as the milestone is met.



