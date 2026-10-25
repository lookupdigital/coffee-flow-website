import Link from "next/link";
import { Footer, Header } from "@/components/ui";

// English translations of the Hebrew legal pages (src/app/(site)/privacy and /accessibility).
// The Hebrew text is the binding version; each page links back to it.

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

const enAdjustments = [
  'A "Skip to main content" link at the start of every page.',
  "Semantic structure: headings in hierarchical order and marked page regions (header, navigation, main content, footer).",
  "Full keyboard operation with a clearly visible focus indicator.",
  "Text alternatives for meaningful images; decorative images are hidden from assistive technologies.",
  "Text-to-background colour contrast at the level the standard requires.",
  "Forms with a label for every field, marked required fields and error messages announced to screen readers.",
  'A control to stop the moving logo strips, and no motion at all for visitors who chose "reduce motion" on their device.',
  "Responsive layout for every screen size and zoom up to 200% without loss of content.",
  "The page language (Hebrew / English) is declared for screen readers.",
  "A text version of the digital catalogue.",
];

const enToolbar = [
  "Increase and decrease the font size",
  "High contrast (dark, light, inverted), dark mode and greyscale",
  "Text spacing and a dyslexia-friendly font",
  "Highlighted links and focus",
  "Stop animations and mute sounds",
  "Large cursor, reading guide and line focus",
  "A map of the page headings",
  "Text-to-speech",
];

export function AccessibilityEn() {
  return (
    <>
      <Header />
      <main id="main-content" className="plain-page legal">
        <h1 className="h2">Accessibility statement</h1>

        <h2>Introduction</h2>
        <p>
          Coffee Flow is committed to giving equal service to all customers and visitors, including people with
          disabilities. We work to make this website accessible, convenient and easy for everyone to use.
        </p>

        <h2>Accessibility level</h2>
        <p>
          The site has been adapted in accordance with the Equal Rights for Persons with Disabilities Regulations
          (Service Accessibility Adjustments), 2013, and Israeli Standard IS 5568 for web content accessibility at
          level AA (based on WCAG 2.0). We also work to meet WCAG 2.1 level AA, in line with the European standard
          EN 301 549.
        </p>
        <p>
          The site was tested on 25 October 2026 with automated tools and manual checks, on desktop and mobile, and
          the issues found were fixed. It supports current browsers (Chrome, Safari, Edge, Firefox) and common screen
          readers such as NVDA and VoiceOver.
        </p>

        <h2>Accessibility adjustments on the site</h2>
        <ul>
          {enAdjustments.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>Accessibility toolbar</h2>
        <p>
          An accessibility button in the corner of the screen opens a toolbar that lets every visitor adapt the
          display to their needs. The toolbar is an additional aid and does not replace the accessibility work done
          on the site itself. Its options:
        </p>
        <ul>
          {enToolbar.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>Toolbar settings are stored only in the visitor&apos;s own browser.</p>

        <h2>Known limitations</h2>
        <ul>
          <li>
            The digital catalogue pages are shown as images. Their content is also available as text on the
            catalogue page. The downloadable PDF is not accessible to screen readers; contact us to receive the
            information in an accessible format.
          </li>
          <li>
            The site links to third-party services (such as WhatsApp and Google). Their accessibility is the
            responsibility of their operators.
          </li>
        </ul>

        <h2>Accessibility enquiries</h2>
        <p>
          If you encounter a difficulty on the site or content that is not accessible, please let us know. It helps
          to mention the page, the difficulty, and the browser or assistive technology you used.
        </p>
        <ul>
          <li>
            Phone: <a href="tel:039766422">03-9766422</a>
          </li>
          <li>
            Email: <a href="mailto:Coffeeflow.sales@diplomat-global.com">Coffeeflow.sales@diplomat-global.com</a>
          </li>
        </ul>

        <h2>Physical accessibility</h2>
        <p>
          Coffee Flow&apos;s service is mostly provided at the customer&apos;s premises. For accessibility
          arrangements for meetings, demonstrations or installations, please contact us using the details above.
        </p>

        <p>Last updated: 25 October 2026</p>
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
      <main id="main-content" className="plain-page legal">
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
