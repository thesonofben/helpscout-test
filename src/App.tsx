//import axios from "axios";
import HelpScout, { NOTIFICATION_TYPES } from "@helpscout/javascript-sdk";
import {
  Button,
  DefaultStyle,
  Heading,
  useSetAppHeight,
  Text,
  useHelpScoutContext,
} from "@helpscout/ui-kit";
import { useEffect, useState } from "react";

function App() {
  const appRef = useSetAppHeight();
  const [userName, setUserName] = useState<string | undefined>("unknown user");
  const [CustomerEmail, setCustomerEmail] = useState<string | undefined>(
    "unknown user",
  );
  const [status, setStatus] = useState<string | undefined>("unknown status");
  const [customerData, setCustomerData] = useState<string | undefined>(
    "Fetching Data...",
  );
  const [country, setCountry] = useState(null);
  const [userID, setuserID] = useState(null);
  const [symponyLink, setsymponyLink] = useState("");

  const [autoRenew, setautoRenew] = useState(null);
  const [yearsAsSub, setyearsAsSub] = useState(null);
  const [attention, setattention] = useState(null);
  const [helpscoutCustomerID, sethelpscoutCustomerID] = useState(null);
  const [subfirstName, setsubfirstName] = useState(null);
  const [lastName, setlastName] = useState(null);
  const [subscriptionType, setsubscriptionType] = useState(null);
  const [subscriptionStartDate, setsubscriptionStartDate] = useState(null);
  const [subscriptionEndDate, setsubscriptionEndDate] = useState(null);
  const [issuesRemaining, setissuesRemaining] = useState(null);
  const [substatus, setsubstatus] = useState(null);

  const { user, conversation, customer } = useHelpScoutContext();
  const CusEmail = useHelpScoutContext().customer?.emails[0]?.value;

  useEffect(() => {
    setUserName(user?.firstName);
    setCustomerEmail(customer?.emails[0]?.value);
    setStatus(conversation?.status);

    fetch(
      "https://script.google.com/macros/s/AKfycbyC3iuqH4FQLbzfkPkkpXN8kWBPaArCI1T1q4PfBHE3HQQjhss4-PIytyNDVRfHKxOx/exec",
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // Add any other headers you need
        // },
        body: JSON.stringify({ data: CusEmail }),
      },
    )
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        const {
          country,
          userID,
          symponyLink,
          autoRenew,
          yearsAsSub,
          attention,
          helpscoutCustomerID,
          firstname,
          lastName,
          subscriptionType,
          subscriptionStartDate,
          subscriptionEndDate,
          issuesRemaining,
          status,
        } = data;

        setCustomerData(data); // Set the customer data in the state
        setCountry(country);
        setuserID(userID);
        setsymponyLink(symponyLink);
        setautoRenew(autoRenew);
        setyearsAsSub(yearsAsSub);
        setattention(attention);
        sethelpscoutCustomerID(helpscoutCustomerID);
        setsubfirstName(firstname);
        setsubscriptionType(subscriptionType);
        setlastName(lastName);
        setsubscriptionStartDate(subscriptionStartDate);
        setsubscriptionEndDate(subscriptionEndDate);
        setissuesRemaining(issuesRemaining);
        setsubstatus(substatus);
      })
      .catch((error) => {
        console.error("Error making the POST request: ", error);
      });
  }, [user, conversation, customer]); // Add CustomerEmail to the dependency array

  function onClick() {
    HelpScout.showNotification(
      NOTIFICATION_TYPES.SUCCESS,
      "Hello from the sidebar app",
    );
  }

  return (
    <div className="App" ref={appRef}>
      <DefaultStyle />
      <Heading level="h1">Hello, {userName}</Heading>
      <Text>The conversation is {status}</Text>

      {/* Display the parsed data with titles in bold and below them */}
      <div>
        <strong>Country:</strong> {country}
      </div>
      <div>
        <strong>User ID:</strong> {userID}
      </div>

      {/* Make symponyLink clickable with display name "Symphony Account" if not null */}
      {symponyLink && (
        <div>
          <strong>Symphony Account:</strong>{" "}
          <a href={symponyLink} target="_blank" rel="noopener noreferrer">
            Symphony Account
          </a>
        </div>
      )}

      <div>
        <strong>Auto Renew:</strong> {autoRenew}
      </div>
      <div>
        <strong>Years as Subscriber:</strong> {yearsAsSub}
      </div>
      <div>
        <strong>Attention:</strong> {attention}
      </div>
      <div>
        <strong>Customer ID:</strong> {helpscoutCustomerID}
      </div>
      <div>
        <strong>First Name:</strong> {subfirstName}
      </div>
      <div>
        <strong>Last Name:</strong> {lastName}
      </div>
      <div>
        <strong>Subscription Type:</strong> {subscriptionType}
      </div>
      <div>
        <strong>Subscription Start Date:</strong> {subscriptionStartDate}
      </div>
      <div>
        <strong>Subscription End Date:</strong> {subscriptionEndDate}
      </div>
      <div>
        <strong>Issues Remaining:</strong> {issuesRemaining}
      </div>

      <Button size="sm" onClick={onClick}>
        Click me
      </Button>
    </div>
  );
}

export default App;

async function fetchData(CustomerEmail: string | undefined) {
  try {
    const options = {
      method: "post",
      body: JSON.stringify({ data: CustomerEmail }), // Send data as JSON string
    };
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyC3iuqH4FQLbzfkPkkpXN8kWBPaArCI1T1q4PfBHE3HQQjhss4-PIytyNDVRfHKxOx/exec",
      options,
    );

    if (!response.ok) {
      throw new Error("Response not OK");
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    return "error: " + error;
  }
}

function goegr() {
  return "hello";
}
