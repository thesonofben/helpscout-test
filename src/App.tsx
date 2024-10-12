import HelpScout, { NOTIFICATION_TYPES } from "@helpscout/javascript-sdk";
import {
  Icon,
  List,
  Spinner,
  Accordion,
  Badge,
  Button,
  DefaultStyle,
  Heading,
  useSetAppHeight,
  Text,
  useHelpScoutContext,
} from "@helpscout/ui-kit";
import { useEffect, useState } from "react";

type MagazineData = {
  [key: string]: {
    issue: string;
    labelRunDate: string;
    onSaleDate: string;
    dispatchDate: string;
    startArrivalDate: string;
    endArrivalDate: string;
  };
};

function formatDate(inputDate: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(inputDate).toLocaleDateString(undefined, options);
}

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
  const [country, setCountry] = useState(String);
  const [userID, setuserID] = useState(null);
  const [symponyLink, setsymponyLink] = useState("");

  const [autoRenew, setautoRenew] = useState(null);
  const [yearsAsSub, setyearsAsSub] = useState(0);
  const [attention, setattention] = useState(null);
  const [helpscoutCustomerID, sethelpscoutCustomerID] = useState(null);
  const [foreName, setforeName] = useState(String);
  const [lastName, setlastName] = useState(String);
  const [subscriptionType, setsubscriptionType] = useState(null);
  const [subscriptionStartDate, setsubscriptionStartDate] = useState(String);
  const [subscriptionEndDate, setsubscriptionEndDate] = useState(String);
  const [issuesRemaining, setissuesRemaining] = useState(null);
  const [subStatus, setsubStatus] = useState(null);
  const [company, setcompany] = useState(null);
  const [address1, setaddress1] = useState(String);
  const [address2, setaddress2] = useState(String);
  const [address3, setaddress3] = useState(String);
  const [county, setcounty] = useState(String);
  const [city, setcity] = useState(String);
  const [post, setpost] = useState(String);
  const [topUp, settopUp] = useState<String[]>([]);
  const [topUpStartETA, settopUpStartETA] = useState(String);
  const [topUpEndETA, settopUpEndETA] = useState(String);
  const [magazines, setMagazines] = useState<MagazineData>({});
  const [etaMin, setetaMin] = useState(String);
  const [etaMax, setetaMax] = useState(String);
  const { user, conversation, customer } = useHelpScoutContext();
  const [openMagazine, setOpenMagazine] = useState(null);

  const CusEmail = useHelpScoutContext().customer?.emails[0]?.value;

  useEffect(() => {
    //setUserName(user?.firstName);
    setCustomerEmail(customer?.emails[0]?.value);
    setStatus(conversation?.status);

    fetch(
      "https://script.google.com/macros/s/AKfycbxeV_PfDhi62pFXT0Co3Pt1DAgGPHV0Qv9laTGUrVlVD_sH6Dp7ffRm4irEashfxO-V/exec",
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // Add any other headers you need
        // },
        body: JSON.stringify({ data: CusEmail, type: "cusData" }),
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
          firstName,
          lastName,
          subscriptionType,
          subscriptionStartDate,
          subscriptionEndDate,
          issuesRemaining,
          status,
          company,
          add1,
          add2,
          add3,
          county,
          city,
          postCode,
          magazines,
          topUp,
          topUpStartETA,
          topUpEndETA,
          etaMin,
          etaMax,
        } = data;

        setCustomerData(data); // Set the customer data in the state
        setCountry(country);
        setuserID(userID);
        setsymponyLink(symponyLink);
        setautoRenew(autoRenew);
        setyearsAsSub(parseInt(yearsAsSub));
        setattention(attention);
        sethelpscoutCustomerID(helpscoutCustomerID);
        setforeName(firstName);
        setsubscriptionType(subscriptionType);
        setlastName(lastName);
        setsubscriptionStartDate(formatDate(subscriptionStartDate));
        setsubscriptionEndDate(formatDate(subscriptionEndDate));
        setissuesRemaining(issuesRemaining);
        setsubStatus(status);
        setcompany(company);
        setaddress1(add1);
        setaddress2(add2);
        setaddress3(add3);
        setcounty(county);
        setcity(city);
        setpost(postCode);
        setetaMin(etaMin);
        setetaMax(etaMax);
        if (Array.isArray(topUp)) {
          settopUp(topUp);
        }
        settopUpStartETA(topUpStartETA);
        settopUpEndETA(topUpEndETA);
        setMagazines(magazines);
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
      {userID ? (
        <div>
          <a href={symponyLink} target="_blank" rel="noopener noreferrer">
            <Button size="xxs" styled="linked" theme="grey">
              <Icon
                style={{ borderRadius: 35, marginTop: "10px" }}
                name="user"
                size={32}
              />
            </Button>
          </a>
          <Text
            style={{
              color: "#2a3b47",
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            {foreName} {lastName}
          </Text>
          <Text
            style={{
              color: "#93a1b0",
              fontSize: 13,
              //paddingBottom: 2
            }}
          >
            {yearsAsSub} {yearsAsSub === 1 ? "Year" : "Years"} as Subscriber
            <br />
            {subStatus}
            <br />
            {country}
            <br />
            {symponyLink && (
              <div>
                <a href={symponyLink} target="_blank" rel="noopener noreferrer">
                  Symphony Account
                </a>
              </div>
            )}
          </Text>
          {attention && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Badge
                status="error"
                style={{ marginTop: "15px", marginLeft: "15px" }}
              >
                {attention}
              </Badge>
            </div>
          )}
        </div>
      ) : (
        <Spinner
          color="#f98e00"
          style={{ alignItems: "center", marginBottom: "10px" }}
        />
      )}
      <Accordion
        expandedSectionIds={["one"]}
        onSectionClick={function noRefCheck() {}}
        allowMultiple
        seamless
      >
        <Accordion.Section
          id="one"
          title={
            <span style={{ display: "flex", alignItems: "center" }}>
              <Icon name="assign" style={{ marginRight: "8px" }} />
              Subscriber Data
            </span>
          }
        >
          {userID ? (
            <div>
              <Text style={{ lineHeight: 1.6, color: "#93a1b0" }}>User ID</Text>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingInlineStart: 6 }}>{userID}</div>
                <Button
                  onClick={() => {
                    if (userID) {
                      HelpScout.setClipboardText(userID);
                    }
                  }}
                  size="xxs"
                  styled="linked"
                  theme="grey"
                >
                  <Icon
                    style={{ borderRadius: 35 }}
                    name="copy-small"
                    size={24}
                  />
                </Button>
              </div>
              <br />
              <Text style={{ lineHeight: 1.6, color: "#93a1b0" }}>
                Subscription Term
              </Text>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingInlineStart: 6 }}>
                  {subscriptionStartDate}
                </div>
                <Button
                  onClick={() => {
                    if (subscriptionStartDate) {
                      HelpScout.setClipboardText(subscriptionStartDate);
                    }
                  }}
                  size="xxs"
                  styled="linked"
                  theme="grey"
                >
                  <Icon
                    style={{ borderRadius: 35 }}
                    name="copy-small"
                    size={24}
                  />
                </Button>{" "}
                -{" "}
                <div style={{ paddingInlineStart: 6 }}>
                  {subscriptionEndDate}
                </div>
                <Button
                  onClick={() => {
                    if (subscriptionEndDate) {
                      HelpScout.setClipboardText(subscriptionEndDate);
                    }
                  }}
                  size="xxs"
                  styled="linked"
                  theme="grey"
                >
                  <Icon
                    style={{ borderRadius: 35 }}
                    name="copy-small"
                    size={24}
                  />
                </Button>
              </div>
              <br />
              <Text style={{ lineHeight: 1.6, color: "#93a1b0" }}>
                Subscription Type
              </Text>
              <Text style={{ paddingInlineStart: 6 }}>
                {" "}
                {subscriptionType} | {autoRenew}
              </Text>
              <br />
              <Text style={{ lineHeight: 1.6, color: "#93a1b0" }}>
                Issues Remaining
              </Text>
              <Text style={{ paddingInlineStart: 6 }}> {issuesRemaining}</Text>
              <br />
              <Text style={{ lineHeight: 1.6, color: "#93a1b0" }}>
                Transit Times
              </Text>
              <Text style={{ paddingInlineStart: 6 }}>
                {" "}
                {etaMin} - {etaMax} days
              </Text>
            </div>
          ) : null}
        </Accordion.Section>

        {!!country && (
          <Accordion.Section
            id="two"
            title={
              <span style={{ display: "flex", alignItems: "center" }}>
                <Icon name="house" style={{ marginLeft: "0px" }} size={24} />
                Subscriber Address
              </span>
            }
          >
            <div>
              <Text style={{ paddingInlineStart: 10 }}>
                {foreName} {lastName}
              </Text>
              <Text style={{ paddingInlineStart: 10 }}>{company}</Text>
              <Text style={{ paddingInlineStart: 10 }}>{address1}</Text>
              <Text style={{ paddingInlineStart: 10 }}>{address2}</Text>
              <Text style={{ paddingInlineStart: 10 }}>{address3}</Text>
              <Text style={{ paddingInlineStart: 10 }}>{county}</Text>
              <Text style={{ paddingInlineStart: 10 }}>
                {city}, {post}
              </Text>
              <Text style={{ paddingInlineStart: 10 }}>{country}</Text>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  onClick={() => {
                    let addressString = `${foreName} ${lastName}\n`;

                    if (company) {
                      addressString += company + "\n";
                    }

                    if (address1) {
                      addressString += address1 + "\n";
                    }

                    if (address2) {
                      addressString += address2 + "\n";
                    }

                    if (address3) {
                      addressString += address3 + "\n";
                    }

                    if (county) {
                      addressString += county + "\n";
                    }

                    if (city && post) {
                      addressString += `${city}, ${post}\n`;
                    } else if (city) {
                      addressString += city + "\n";
                    } else if (post) {
                      addressString += post + "\n";
                    }

                    if (country) {
                      addressString += country;
                    }

                    HelpScout.setClipboardText(addressString);
                  }}
                  size="xxs"
                  styled="linked"
                  theme="grey"
                >
                  <Icon
                    style={{ borderRadius: 35 }}
                    name="copy-small"
                    size={24}
                  />
                </Button>
              </div>
            </div>
          </Accordion.Section>
        )}
        {!!topUp.length && (
          <Accordion.Section
            id="four"
            title={
              <span style={{ display: "flex", alignItems: "center" }}>
                <Icon name="circle-plus" style={{ marginRight: "8px" }} />
                Top-ups
              </span>
            }
          >
            <Text style={{ lineHeight: 1.6, color: "#93a1b0" }}>Issues: </Text>
            <div>
              <ul>
                {topUp.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <Text style={{ lineHeight: 1.6, color: "#93a1b0" }}>
              Estimated Arrival Dates:{" "}
            </Text>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ paddingInlineStart: 6 }}>
                {formatDate(topUpStartETA.substring(0, 10))} -{" "}
                {formatDate(topUpEndETA.substring(0, 10))}
              </div>
              <Button
                onClick={() => {
                  if (topUpEndETA) {
                    HelpScout.setClipboardText(
                      formatDate(topUpStartETA.substring(0, 10)) +
                        " - " +
                        formatDate(topUpEndETA.substring(0, 10)),
                    );
                  }
                }}
                size="xxs"
                styled="linked"
                theme="grey"
              >
                <Icon
                  style={{ borderRadius: 35 }}
                  name="copy-small"
                  size={24}
                />
              </Button>
            </div>
          </Accordion.Section>
        )}
        <Accordion.Section
          id="three"
          title={
            <span style={{ display: "flex", alignItems: "center" }}>
              <Icon name="envelope-large" style={{ marginRight: "8px" }} />
              Dispatched issues from MG
            </span>
          }
        >
          <p>One day, Jessica will give us access to their database.</p>
        </Accordion.Section>
      </Accordion>

      <Accordion
        expandedSectionIds={[]}
        onSectionClick={function noRefCheck() {}}
        allowMultiple
        seamless
      >
        {Object.keys(magazines).map((magazineKey) => (
          <Accordion.Section
            id={magazineKey}
            title={
              <span style={{ display: "flex", alignItems: "center" }}>
                <Icon name="magazine" style={{ marginRight: "8px" }} />
                {magazines[magazineKey].issue}
              </span>
            }
          >
            <div>
              <Text style={{ lineHeight: 1.6, color: "#93a1b0" }}>
                Label Run Date:{" "}
              </Text>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingInlineStart: 6 }}>
                  {formatDate(magazines[magazineKey].labelRunDate)}
                </div>
                <Button
                  onClick={() => {
                    if (magazines[magazineKey].labelRunDate) {
                      HelpScout.setClipboardText(
                        formatDate(magazines[magazineKey].labelRunDate),
                      );
                    }
                  }}
                  size="xxs"
                  styled="linked"
                  theme="grey"
                >
                  <Icon
                    style={{ borderRadius: 35 }}
                    name="copy-small"
                    size={24}
                  />
                </Button>
              </div>
              <br />
              <Text style={{ lineHeight: 1.6, color: "#93a1b0" }}>
                Dispatch Date:{" "}
              </Text>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingInlineStart: 6 }}>
                  {formatDate(magazines[magazineKey].dispatchDate)}
                </div>
                <Button
                  onClick={() => {
                    if (magazines[magazineKey].dispatchDate) {
                      HelpScout.setClipboardText(
                        formatDate(magazines[magazineKey].dispatchDate),
                      );
                    }
                  }}
                  size="xxs"
                  styled="linked"
                  theme="grey"
                >
                  <Icon
                    style={{ borderRadius: 35 }}
                    name="copy-small"
                    size={24}
                  />
                </Button>
              </div>
              <br />
              <Text style={{ lineHeight: 1.6, color: "#93a1b0" }}>
                On Sale Date:{" "}
              </Text>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingInlineStart: 6 }}>
                  {formatDate(magazines[magazineKey].onSaleDate)}
                </div>
                <Button
                  onClick={() => {
                    if (magazines[magazineKey].onSaleDate) {
                      HelpScout.setClipboardText(
                        formatDate(magazines[magazineKey].onSaleDate),
                      );
                    }
                  }}
                  size="xxs"
                  styled="linked"
                  theme="grey"
                >
                  <Icon
                    style={{ borderRadius: 35 }}
                    name="copy-small"
                    size={24}
                  />
                </Button>
              </div>
              <br />
              <Text style={{ lineHeight: 1.6, color: "#93a1b0" }}>
                Estimated Arrival Dates:{" "}
              </Text>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingInlineStart: 6 }}>
                  {formatDate(magazines[magazineKey].startArrivalDate)} -{" "}
                  {formatDate(magazines[magazineKey].endArrivalDate)}
                </div>

                <Button
                  onClick={() => {
                    if (magazines[magazineKey].endArrivalDate) {
                      HelpScout.setClipboardText(
                        formatDate(magazines[magazineKey].startArrivalDate) +
                          " - " +
                          formatDate(magazines[magazineKey].endArrivalDate),
                      );
                    }
                  }}
                  size="xxs"
                  styled="linked"
                  theme="grey"
                >
                  <Icon
                    style={{ borderRadius: 35 }}
                    name="copy-small"
                    size={24}
                  />
                </Button>
              </div>
            </div>
          </Accordion.Section>
        ))}
      </Accordion>
      <br />
      <Button size="sm" onClick={onClick}>
        Click me
      </Button>
      <style>
        {`
        html, body {
          overflow: hidden;
        }
      `}
      </style>
    </div>
  );
}

export default App;
