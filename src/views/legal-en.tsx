import Link from "next/link";
import { Footer, Header } from "@/components/ui";

// English translations of the Hebrew legal pages (src/app/(site)/privacy and /accessibility).
// The Hebrew text is the binding version; each page links back to it.

const menuOptions = [
  "Keyboard navigation – the site can be navigated with the keyboard.",
  "Screen reader support – the site is adapted for assistive technologies such as NVDA and JAWS.",
  "Flash blocking – stops moving elements and blocks flashing content.",
  "Optical character recognition.",
  "Site font enlargement in 5 sizes.",
  "Voice commands.",
  "Contrast adjustment – colour contrast changes on a dark background.",
  "Contrast adjustment – colour contrast changes on a light background.",
  "Site colour changes – background, headings and content.",
  "Colour-blind mode.",
  "Switching to a readable font.",
  "Larger cursor, in black or white.",
  "Zooming the display to about 200%.",
  "Highlighting links.",
  "Highlighting headings.",
  "Showing alternative text for images.",
  "Magnifying the content under the cursor in a tooltip.",
  "Showing the site's content in a new, clear and readable window.",
  "A virtual keyboard for typing with the mouse.",
];

const thirdParty = [
  "Facebook's accessibility policy",
  "YouTube's accessibility policy",
  "Instagram's accessibility policy",
  "Twitter's accessibility policy",
  "LinkedIn's accessibility policy",
];

function BindingNote({ href }: { href: string }) {
  return (
    <p className="text">
      This is a translation for convenience. In case of any discrepancy, the{" "}
      <Link href={href} lang="he" hrefLang="he">
        Hebrew version
      </Link>{" "}
      prevails.
    </p>
  );
}

export function AccessibilityEn() {
  return (
    <>
      <Header />
      <main className="plain-page legal">
        <h1 className="h2">Accessibility statement</h1>

        <h2>Introduction</h2>
        <p>
          The internet is today the largest source of free information for all users, and for users with
          disabilities in particular. We therefore place great importance on giving people with disabilities equal
          access to the information on this site and a better browsing experience.
        </p>
        <p>
          We strive to make our digital services accessible to people with disabilities, and have invested
          considerable resources in making the site as easy as possible to use for people with disabilities, in the
          belief that everyone deserves to live with equality, dignity, comfort and independence.
        </p>
        <p>This site was made accessible by the web accessibility company &quot;Nagish BeClick&quot;.</p>
        <p>
          The website meets, as far as possible, the requirements of the Equal Rights for Persons with Disabilities
          Regulations (Service Accessibility Adjustments), 2013. The accessibility adjustments follow the
          recommendations of Israeli Standard IS 5568 for web content accessibility at level AA and the
          international WCAG 2.0 guidelines.
        </p>
        <p>
          The site provides a semantic structure for assistive technologies and supports standard keyboard
          operation. For the best experience with screen-reading software, we recommend the latest version of NVDA.
          Responsibility for use and implementation lies with the site owner and/or anyone on its behalf, including
          the content shown on the site, subject to the software&apos;s terms of use and the company&apos;s privacy
          policy.
        </p>

        <h2>How does accessibility work on this site?</h2>
        <p>
          This site runs accessibility software by &quot;Nagish BeClick&quot;, operated through a dedicated
          accessibility server. The software helps the site follow the Web Content Accessibility Guidelines (WCAG)
          2.1 at level AA. The software is subject to the manufacturer&apos;s terms of use and privacy policy, as
          well as the site owner&apos;s privacy policy.
        </p>
        <p>
          The site has an accessibility menu. Clicking the accessibility button opens the menu with the
          accessibility options. After choosing an option, please wait for the page to load.
        </p>
        <p>The software works in the popular browsers: Chrome, Firefox, Explorer 10+, Safari and Opera.</p>

        <h3>Accessibility options in the menu</h3>
        <ul>
          {menuOptions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="legal-subtitle">Third-party components and websites:</p>
        <p>
          Where the site uses third-party components or websites such as Facebook, Instagram, YouTube, Twitter,
          external chats and others that are not under our control, people with disabilities may face challenges
          we are unable to fix.
        </p>
        <p>Some examples of third-party accessibility policies:</p>
        <ul>
          {thirdParty.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="legal-subtitle">Contacting the accessibility coordinator</p>
        <p>
          If you encounter an accessibility difficulty while browsing the site, the company&apos;s accessibility
          team is available through a range of channels. We would be glad to hear your feedback.
        </p>

        <p className="legal-subtitle">Physical accessibility arrangements</p>

        <p className="legal-subtitle">Disclaimer</p>
        <p>
          Despite our efforts to make every page of the site accessible, some pages may not yet be accessible, or a
          suitable technological solution may not yet have been found.
        </p>
        <p>
          We continue working to improve the site&apos;s accessibility as far as possible, out of a belief in and
          moral commitment to making the site usable by everyone, including people with disabilities.
        </p>
        <p>Last updated: 22 September 2025</p>
        <BindingNote href="/accessibility" />
      </main>
      <Footer locale="en" />
    </>
  );
}

export function PrivacyEn() {
  return (
    <>
      <Header />
      <main className="plain-page legal">
        <h1 className="h2">Cookie policy</h1>
        <ol>
          <li>
            Diplomat Distributors (1968) Ltd. (the &quot;<strong>Company</strong>&quot;) uses cookies and other
            technologies such as pixels (together, the &quot;<strong>Cookies</strong>&quot;) to collect
            non-identifying information about users of the site. Without derogating from the above, if a user
            chooses to provide identifying information on the site, that information will be linked to the
            non-identifying information collected on the site.
          </li>
          <li>
            Cookies are small text files that allow information to be collected through users&apos; computers or
            web browsers, including, among other things: the pages a user visited on the site, actions taken on the
            site, the time spent on the site, content viewed, approximate geographic location, age range, the type
            of device used to access the site, interests, the user&apos;s IP address (i.e. the address of the
            user&apos;s computer on the internet), number of visits, number of clicks, screen resolution, operating
            system and version, browser type and version, language preference, domain names and more.
          </li>
          <li>
            The Company will use the information collected through Cookies for one or more of the following
            purposes: to manage and operate the site; to make the site easier to use; to show the user content and
            advertising on and off the site (for example across the internet, on Facebook, Google and elsewhere)
            that may interest them and/or suit their preferences; to analyse, research and audit the site; to
            monitor activity patterns on the site; and to compile statistics, including the number of users of the
            site.
          </li>
          <li>
            The Company uses Cookies of advertising systems such as Google and Facebook, which monitor users&apos;
            use of the site. Use of the information collected through Google&apos;s and Facebook&apos;s Cookies is
            subject to those companies&apos; terms of use and privacy policies. You can learn about the information
            collected through these Cookies, how those companies use it, how to disable the Cookies and more in
            Google&apos;s privacy policy{" "}
            <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener noreferrer">
              https://policies.google.com/privacy?hl=en
            </a>{" "}
            and Facebook&apos;s privacy policy{" "}
            <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer">
              https://www.facebook.com/privacy/explanation
            </a>
            .
          </li>
          <li>
            Without derogating from the above and from the provisions of the privacy policy, the Company may pass
            non-identifying information to third-party advertising systems such as Google and Facebook in order to
            show the user content and advertising that may interest them and/or suit their preferences.
          </li>
          <li>
            The Company uses third-party analytics, statistical analysis and research services such as Google
            Analytics. Use of Google Analytics is subject to Google Analytics&apos; terms of use and privacy policy.
            You can learn about the information collected through these services in the Google Analytics privacy
            policy:{" "}
            <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener noreferrer">
              https://policies.google.com/privacy?hl=en
            </a>
            .
          </li>
          <li>
            A user who does not want Cookies to be collected on their computer can prevent this by changing their
            browser settings. To do so, consult the browser&apos;s help file. Disabling Cookies may make some of the
            site&apos;s services unavailable or reduce their quality. Notwithstanding the above, Cookies that are
            essential to operating and managing the site cannot be disabled.
          </li>
          <li>
            The terms and provisions of this policy, and any change or amendment to them, are governed by the laws
            of the State of Israel, without regard to its conflict-of-law rules.
          </li>
          <li>
            The courts of Tel Aviv – Jaffa have exclusive jurisdiction over any dispute and/or claim arising in
            connection with this policy.
          </li>
          <li>
            The Company may change this policy from time to time at its sole discretion, without notice. The latest
            Cookie policy published on the site will bind the user. Continued use of the site after the Cookie
            policy is updated constitutes the user&apos;s consent to the updated policy, including its changes.
          </li>
        </ol>
        <p className="text">Last updated: 22 October 2020</p>
        <BindingNote href="/privacy" />
      </main>
      <Footer locale="en" />
    </>
  );
}
