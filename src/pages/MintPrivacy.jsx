import React from 'react'
import { Link } from 'react-router-dom'
import { Section, Container } from '../components/layout/container'
import { Card } from '../components/ui/card'
import { useLanguage } from '../contexts/LanguageContext'

function Heading({ children }) {
  return <h2 className="text-xl font-semibold text-white mb-3">{children}</h2>
}

function SubHeading({ children }) {
  return <h3 className="text-base font-semibold text-white mt-4 mb-2">{children}</h3>
}

function Bullets({ items }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="text-deep-400 text-sm leading-relaxed pl-4 relative before:content-['-'] before:absolute before:left-0 before:text-deep-600">
          {item}
        </li>
      ))}
    </ul>
  )
}

// Content lives here (not in i18n/translations.js) because it's a large,
// self-contained legal document specific to this one page, not short UI
// strings reused across the site. The Polish text is the original
// translation of mint/software/docs/play/privacy-policy.md; the English
// text mirrors that source file directly.
const CONTENT = {
  pl: {
    back: '← Powrót do MINT',
    title: 'Polityka prywatności — MINT',
    updated: 'Ostatnia aktualizacja: 31 lipca 2026',
    intro: 'MINT („aplikacja") to aplikacja towarzysząca beaconowi inercyjnemu MINT — urządzeniu Bluetooth Low Energy. Ten dokument opisuje, co aplikacja robi z danymi. Jest krótki, ponieważ aplikacja robi niewiele: nie ma kont użytkowników, analityki, reklam ani śledzenia, a nic nie jest wysyłane na serwery obsługiwane przez nas poza sytuacją, gdy poprosisz aplikację o sprawdzenie aktualizacji oprogramowania układowego (firmware).',
    adminLabel: 'Administrator danych:',
    admin: 'I.N.T. Software Development - Paweł Iwaneczko',
    contactLabel: 'Kontakt:',
    contact: 'piwaneczko@int-sd.net',
    summaryHeading: 'Podsumowanie',
    summaryBullets: [
      'Aplikacja nie ma kont użytkowników i nie zbiera imienia, adresu e-mail, numeru telefonu ani listy kontaktów.',
      'Nie zawiera żadnych SDK reklamowych ani analitycznych i nie korzysta z identyfikatora reklamowego Android.',
      'Dane pomiarowe i logi diagnostyczne pozostają na Twoim urządzeniu.',
      'Twoja przybliżona pozycja jest wysyłana do zewnętrznych usług mapowych i geomagnetycznych, aby aplikacja mogła wyświetlić mapę i obliczyć poprawkę deklinacji magnetycznej. Jest to niezbędne dla tych funkcji i opisane poniżej.',
      'Cały ruch sieciowy wykorzystuje HTTPS.',
    ],
    accessHeading: 'Do czego aplikacja ma dostęp na Twoim urządzeniu',
    locationSub: 'Lokalizacja',
    locationP1: (
      <>
        Aplikacja wymaga dostępu do lokalizacji precyzyjnej (ACCESS_FINE_LOCATION)
        oraz przybliżonej (ACCESS_COARSE_LOCATION). Lokalizacja jest wykorzystywana
        wyłącznie, gdy aplikacja działa na pierwszym planie — aplikacja{' '}
        <strong className="text-white">nie</strong> żąda dostępu do lokalizacji
        w tle i nie może odczytać Twojej pozycji, gdy jest zamknięta.
      </>
    ),
    locationP2: 'Lokalizacja jest wykorzystywana do:',
    locationBullets: [
      'wyśrodkowania mapy na Twojej pozycji i jej wyświetlenia;',
      'powiązania sesji nawigacji z rzeczywistym punktem startowym;',
      'pobrania deklinacji magnetycznej i lokalnej grawitacji dla Twojej pozycji oraz zapisania ich w podłączonym beaconie, aby skorygować jego kurs względem miejsca, w którym się znajdujesz;',
      'pobrania obrysu budynku i planu wnętrza wokół wybranego punktu;',
      'opcjonalnego zapisania pozycji w pliku logu diagnostycznego, gdy włączysz logowanie.',
    ],
    bluetoothSub: 'Bluetooth',
    bluetoothP1: 'Aplikacja wymaga uprawnień BLUETOOTH_SCAN oraz BLUETOOTH_CONNECT, aby wyszukiwać i łączyć się z beaconami MINT. Skanowanie jest zadeklarowane z flagą neverForLocation, co oznacza, że system Android ma zakaz umożliwiania aplikacji wyznaczania Twojej lokalizacji na podstawie wyników skanowania Bluetooth.',
    bluetoothP2: 'Identyfikator i nazwa beacona, z którym się łączysz, są zapisywane na Twoim urządzeniu, aby aplikacja mogła go rozpoznać następnym razem. Nie są nigdzie przesyłane.',
    filesSub: 'Pliki',
    filesP1: 'Logi diagnostyczne i telemetryczne są zapisywane jako pliki CSV we własnym katalogu multimediów aplikacji (Android/media/net.intsd.mint/). Zawierają odczyty z czujników beacona oraz — po włączeniu tej opcji — pozycje GPS. Pozostają na Twoim urządzeniu, są wyświetlane na ekranie Ustawień aplikacji i można je stamtąd usunąć (lub za pomocą dowolnego menedżera plików). Nie są nigdzie przesyłane. Jeśli udostępnisz jakiś plik — e-mailem, w chmurze lub przez kabel — jest to Twoje działanie, a nie aplikacji.',
    filesP2: 'Aplikacja nie żąda dostępu do zdjęć, filmów, dźwięku ani współdzielonych kolekcji multimediów.',
    thirdPartyHeading: 'Dane przekazywane podmiotom trzecim',
    thirdPartyP1: 'Aby rysować mapy i korygować kurs beacona, aplikacja musi odpytywać publiczne usługi o Twoje otoczenie. Każde takie zapytanie z konieczności ujawnia operatorowi danej usługi przybliżoną informację o tym, gdzie się znajdujesz. Do tych zapytań nie jest dołączany żaden identyfikator Ciebie ani Twojego urządzenia, a aplikacja nie wysyła wraz z nimi konta, adresu e-mail ani identyfikatora reklamowego.',
    tableHeaders: ['Usługa', 'Operator', 'Co jest wysyłane', 'Po co'],
    thirdParties: [
      { service: 'OpenFreeMap', operator: 'OpenFreeMap', sent: 'Współrzędne kafelków mapy dla wyświetlanego obszaru', why: 'Mapa bazowa' },
      { service: 'Esri World Imagery', operator: 'Esri', sent: 'Współrzędne kafelków mapy dla wyświetlanego obszaru', why: 'Widok satelitarny, po jego włączeniu' },
      { service: 'Overpass API', operator: 'Overpass API (overpass-api.de)', sent: 'Obszar (bounding box) wokół interesującego miejsca', why: 'Obrysy budynków i plany wnętrz' },
      { service: 'Nominatim', operator: 'OpenStreetMap Foundation', sent: 'Tekst wpisany w pole wyszukiwania na mapie', why: 'Wyszukiwanie miejsca po nazwie' },
      { service: 'Kalkulator geomagnetyczny NOAA NCEI', operator: 'Amerykański Narodowy Urząd ds. Oceanów i Atmosfery (NOAA)', sent: 'Szerokość i długość geograficzna', why: 'Deklinacja magnetyczna dla Twojej pozycji' },
      { service: 'int-sd.net', operator: 'I.N.T. Software Development - Paweł Iwaneczko', sent: 'Nic o Tobie; zapytanie o manifest oraz obraz oprogramowania układowego (firmware)', why: 'Sprawdzanie i pobieranie aktualizacji oprogramowania beacona' },
    ],
    thirdPartyP2: 'Każdy z tych operatorów przetwarza zapytanie na podstawie własnej polityki prywatności. Nie mamy z nimi żadnej umowy, nie otrzymujemy od nich żadnych danych zwrotnych o Tobie i nie możemy w Twoim imieniu usunąć danych z ich logów.',
    thirdPartyP3: 'Zapytania do int-sd.net dotyczące aktualizacji oprogramowania trafiają na serwer obsługiwany przez I.N.T. Software Development - Paweł Iwaneczko. Mogą być tam zapisywane standardowe logi serwera WWW (adres IP, czas, żądany plik) w celach operacyjnych; nie są one wykorzystywane do budowania Twojego profilu.',
    notDoHeading: 'Czego nie robimy',
    notDoBullets: [
      'Nie sprzedajemy ani nie wynajmujemy danych.',
      'Nie wykorzystujemy danych do reklamy ani marketingu.',
      'Nie korzystamy z analityki, raportowania awarii ani SDK do atrybucji.',
      'Nie korzystamy z identyfikatora reklamowego Android — aplikacja nie deklaruje uprawnienia AD_ID.',
      'Nie tworzymy profili użytkowników ani nie śledzimy Cię między aplikacjami lub stronami internetowymi.',
    ],
    retentionHeading: 'Przechowywanie i usuwanie danych',
    retentionP1: 'Ponieważ aplikacja przechowuje wszystko na Twoim urządzeniu, retencja danych jest pod Twoją kontrolą:',
    retentionBullets: [
      'usuń pojedyncze pliki logów na ekranie Ustawień lub wszystkie naraz, czyszcząc pamięć aplikacji;',
      'odinstalowanie aplikacji usuwa jej ustawienia oraz zapisane identyfikatory beaconów. Pliki logów zapisane w Android/media/net.intsd.mint/ mogą przetrwać odinstalowanie — z założenia, ponieważ ten katalog ma pozostać dostępny — usuń go ręcznie za pomocą menedżera plików, jeśli chcesz się go pozbyć;',
      'czyszczenie pamięci podręcznej danych mapy jest dostępne osobno w Ustawieniach.',
    ],
    retentionP2: 'Nie przechowujemy żadnych Twoich danych osobowych, więc nie mamy czego usuwać na Twoje żądanie. Jeśli uważasz inaczej, napisz na piwaneczko@int-sd.net.',
    legalHeading: 'Podstawa prawna (użytkownicy z UE/EOG)',
    legalP1: 'Tam, gdzie ma zastosowanie RODO, opisane powyżej przetwarzanie odbywa się w celu realizacji funkcjonalności, o którą prosisz (art. 6 ust. 1 lit. b RODO) — aplikacja, która wyświetla mapę bez znajomości Twojej pozycji, lub koryguje kompas bez znajomości Twojej długości geograficznej, nie może działać. Możesz w każdej chwili wycofać uprawnienie do lokalizacji w ustawieniach systemu Android; funkcje mapy i deklinacji magnetycznej przestaną wtedy działać, a reszta aplikacji będzie działać nadal.',
    legalP2: 'Przekazywanie danych do wymienionych powyżej usług zewnętrznych stanowi przekazanie danych ich odpowiednim operatorom, w tym operatorom spoza EOG.',
    rightsSub: 'Prawa osoby, której dane dotyczą',
    rightsP1: 'Przysługuje Ci prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz wniesienia sprzeciwu, a także prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.',
    childrenHeading: 'Dzieci',
    childrenP1: 'Aplikacja jest narzędziem do obsługi urządzenia pomiarowego i nie jest kierowana do dzieci.',
    changesHeading: 'Zmiany',
    changesP1: 'Jeśli ta polityka ulegnie zmianie, data „ostatniej aktualizacji" powyżej zmieni się wraz z nią, a nowa wersja zastąpi tę pod tym samym adresem.',
    contactHeading: 'Kontakt',
  },
  en: {
    back: '← Back to MINT',
    title: 'Privacy Policy — MINT',
    updated: 'Last updated: 2026-07-31',
    intro: 'MINT ("the app") is a companion application for the MINT inertial-navigation beacon, a Bluetooth Low Energy device. This policy describes what the app does with data. It is short because the app does little: there are no user accounts, no analytics, no advertising, no tracking, and nothing is sent to servers operated by us except when you ask the app to check for a firmware update.',
    adminLabel: 'Publisher:',
    admin: 'I.N.T. Software Development - Paweł Iwaneczko',
    contactLabel: 'Contact:',
    contact: 'piwaneczko@int-sd.net',
    summaryHeading: 'Summary',
    summaryBullets: [
      'The app has no user accounts and collects no name, e-mail, phone number or contact list.',
      'It contains no advertising and no analytics SDKs, and does not use the Android advertising ID.',
      'Measurement data and diagnostic logs stay on your device.',
      'Your approximate position is sent to third-party map and geomagnetic services so the app can draw a map and compute a magnetic-declination correction. This is unavoidable for those features and is described below.',
      'All network traffic uses HTTPS.',
    ],
    accessHeading: 'What the app accesses on your device',
    locationSub: 'Location',
    locationP1: (
      <>
        The app requests precise location (ACCESS_FINE_LOCATION) and
        approximate location (ACCESS_COARSE_LOCATION). Location is used only
        while the app is in the foreground — the app does{' '}
        <strong className="text-white">not</strong> request
        background-location access and cannot read your position when it is
        closed.
      </>
    ),
    locationP2: 'Location is used to:',
    locationBullets: [
      'centre the map on you and draw your position;',
      'anchor a navigation session to a real-world starting point;',
      'fetch the magnetic declination and local gravity for your position and write them to the connected beacon, so its heading is corrected for where you are;',
      'fetch the building outline and indoor plan around a chosen point;',
      'optionally record position into a diagnostic log file, when you turn logging on.',
    ],
    bluetoothSub: 'Bluetooth',
    bluetoothP1: 'The app requests BLUETOOTH_SCAN and BLUETOOTH_CONNECT in order to find and connect to MINT beacons. The scan is declared with neverForLocation, meaning Android is instructed not to let the app derive your location from Bluetooth scan results.',
    bluetoothP2: 'The identifier and name of a beacon you connect to are stored on your device so the app can recognise it next time. They are not transmitted anywhere.',
    filesSub: 'Files',
    filesP1: "Diagnostic and telemetry logs are written as CSV files into the app's own media directory (Android/media/net.intsd.mint/). They contain sensor readings from the beacon and, when you enable it, GPS positions. They stay on your device, are listed in the app's Settings screen, and can be deleted there or with any file manager. They are uploaded nowhere. If you share one — by e-mail, cloud storage or a cable — that is your action, not the app's.",
    filesP2: 'The app does not request access to photos, video, audio or the shared media collections.',
    thirdPartyHeading: 'Data sent to third parties',
    thirdPartyP1: 'To draw maps and correct the beacon’s heading, the app has to ask public services about your surroundings. Each request necessarily reveals roughly where you are to the operator of that service. No identifier of you or your device is attached to these requests, and the app sends no account, e-mail or advertising identifier with them.',
    tableHeaders: ['Service', 'Operator', 'What is sent', 'Why'],
    thirdParties: [
      { service: 'OpenFreeMap', operator: 'OpenFreeMap', sent: 'Map tile coordinates for the area shown', why: 'Base map' },
      { service: 'Esri World Imagery', operator: 'Esri', sent: 'Map tile coordinates for the area shown', why: 'Satellite view, when you enable it' },
      { service: 'Overpass API', operator: 'Overpass API (overpass-api.de)', sent: 'A bounding box around the area of interest', why: 'Building outlines and indoor floor plans' },
      { service: 'Nominatim', operator: 'OpenStreetMap Foundation', sent: 'The text you type into the map search box', why: 'Finding a place by name' },
      { service: 'NOAA NCEI geomagnetic calculator', operator: 'US National Oceanic and Atmospheric Administration', sent: 'Latitude and longitude', why: 'Magnetic declination for your position' },
      { service: 'int-sd.net', operator: 'I.N.T. Software Development - Paweł Iwaneczko', sent: 'Nothing about you; a request for the firmware manifest and firmware image', why: 'Checking for and downloading beacon firmware updates' },
    ],
    thirdPartyP2: 'Each of these operators processes the request under its own privacy policy. We have no agreement with them, receive nothing back about you, and cannot delete data on your behalf from their logs.',
    thirdPartyP3: 'Requests to int-sd.net for firmware updates reach a server operated by I.N.T. Software Development - Paweł Iwaneczko. Standard web-server logs (IP address, time, requested file) may be recorded there for operational purposes and are not used to build a profile of you.',
    notDoHeading: 'What we do not do',
    notDoBullets: [
      'We do not sell or rent data.',
      'We do not use data for advertising or marketing.',
      'We do not use analytics, crash-reporting or attribution SDKs.',
      'We do not use the Android advertising ID; the app does not declare the AD_ID permission.',
      'We do not create user profiles or track you across apps or websites.',
    ],
    retentionHeading: 'Retention and deletion',
    retentionP1: 'Because the app keeps everything on your device, retention is under your control:',
    retentionBullets: [
      'delete individual log files from the Settings screen, or all of them by clearing the app’s storage;',
      'uninstalling the app removes its settings and its stored beacon identifiers. Log files written to Android/media/net.intsd.mint/ may survive uninstall by design, since that directory is meant to stay accessible — delete it with a file manager if you want it gone;',
      'clearing the map-data cache is offered separately in Settings.',
    ],
    retentionP2: 'We hold no personal data of yours, so there is nothing for us to delete on request. If you believe otherwise, write to piwaneczko@int-sd.net.',
    legalHeading: 'Legal basis (EU/EEA users)',
    legalP1: 'Where the GDPR applies, the processing described above is carried out to provide the functionality you requested (Art. 6(1)(b)) — an app that shows a map without knowing where you are, or corrects a compass without knowing your longitude, cannot work. You may withdraw location permission at any time in Android settings; the map and declination features stop working, the rest of the app continues to.',
    legalP2: 'The transfers to third-party services listed above are transfers to their respective operators, including operators outside the EEA.',
    rightsSub: 'Your rights',
    rightsP1: 'You have the right to access, rectify, erase and restrict processing of your data, to data portability, to object to processing, and to lodge a complaint with your national data protection authority.',
    childrenHeading: 'Children',
    childrenP1: 'The app is a tool for operating a piece of measurement hardware and is not directed at children.',
    changesHeading: 'Changes',
    changesP1: 'If this policy changes, the "last updated" date above changes with it, and the new version replaces this one at the same address.',
    contactHeading: 'Contact',
  },
}

// Source of truth for the English text: mint/software/docs/play/privacy-policy.md
// (kept in sync manually — the Polish text is its original translation, plus a
// GDPR "your rights" note mirrored into English for parity between languages).
export function MintPrivacyPage() {
  const { lang } = useLanguage()
  const c = CONTENT[lang] ?? CONTENT.pl

  return (
    <Section>
      <Container maxWidth="md">
        <Link to="/mint" className="text-primary text-sm hover:text-cyan-400 transition-colors mb-6 inline-block">
          {c.back}
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{c.title}</h1>
        <p className="text-deep-500 text-sm mb-8">{c.updated}</p>

        <Card className="mb-10" hoverEffect={false}>
          <p className="text-deep-300 leading-relaxed text-sm">{c.intro}</p>
          <p className="text-deep-400 text-sm mt-4">
            {c.adminLabel} {c.admin}<br />
            {c.contactLabel} {c.contact}
          </p>
        </Card>

        <div className="space-y-10">
          <div>
            <Heading>{c.summaryHeading}</Heading>
            <Bullets items={c.summaryBullets} />
          </div>

          <div>
            <Heading>{c.accessHeading}</Heading>

            <SubHeading>{c.locationSub}</SubHeading>
            <p className="text-deep-400 text-sm leading-relaxed mb-2">{c.locationP1}</p>
            <p className="text-deep-400 text-sm leading-relaxed mb-2">{c.locationP2}</p>
            <Bullets items={c.locationBullets} />

            <SubHeading>{c.bluetoothSub}</SubHeading>
            <p className="text-deep-400 text-sm leading-relaxed mb-2">{c.bluetoothP1}</p>
            <p className="text-deep-400 text-sm leading-relaxed">{c.bluetoothP2}</p>

            <SubHeading>{c.filesSub}</SubHeading>
            <p className="text-deep-400 text-sm leading-relaxed mb-2">{c.filesP1}</p>
            <p className="text-deep-400 text-sm leading-relaxed">{c.filesP2}</p>
          </div>

          <div>
            <Heading>{c.thirdPartyHeading}</Heading>
            <p className="text-deep-400 text-sm leading-relaxed mb-4">{c.thirdPartyP1}</p>

            <div className="overflow-x-auto -mx-2 mb-4">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="text-left text-deep-500 text-xs uppercase tracking-wider">
                    {c.tableHeaders.map(h => (
                      <th key={h} className="py-2 px-2 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.thirdParties.map((row, i) => (
                    <tr key={row.service} className={i % 2 === 0 ? 'bg-deep-800/40' : ''}>
                      <td className="py-2 px-2 text-white rounded-l align-top">{row.service}</td>
                      <td className="py-2 px-2 text-deep-300 align-top">{row.operator}</td>
                      <td className="py-2 px-2 text-deep-400 align-top">{row.sent}</td>
                      <td className="py-2 px-2 text-deep-400 rounded-r align-top">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-deep-400 text-sm leading-relaxed mb-2">{c.thirdPartyP2}</p>
            <p className="text-deep-400 text-sm leading-relaxed">{c.thirdPartyP3}</p>
          </div>

          <div>
            <Heading>{c.notDoHeading}</Heading>
            <Bullets items={c.notDoBullets} />
          </div>

          <div>
            <Heading>{c.retentionHeading}</Heading>
            <p className="text-deep-400 text-sm leading-relaxed mb-2">{c.retentionP1}</p>
            <Bullets items={c.retentionBullets} />
            <p className="text-deep-400 text-sm leading-relaxed mt-2">{c.retentionP2}</p>
          </div>

          <div>
            <Heading>{c.legalHeading}</Heading>
            <p className="text-deep-400 text-sm leading-relaxed mb-2">{c.legalP1}</p>
            <p className="text-deep-400 text-sm leading-relaxed mb-4">{c.legalP2}</p>
            <SubHeading>{c.rightsSub}</SubHeading>
            <p className="text-deep-400 text-sm leading-relaxed">{c.rightsP1}</p>
          </div>

          <div>
            <Heading>{c.childrenHeading}</Heading>
            <p className="text-deep-400 text-sm leading-relaxed">{c.childrenP1}</p>
          </div>

          <div>
            <Heading>{c.changesHeading}</Heading>
            <p className="text-deep-400 text-sm leading-relaxed">{c.changesP1}</p>
          </div>

          <div>
            <Heading>{c.contactHeading}</Heading>
            <p className="text-deep-400 text-sm leading-relaxed">{c.contact}</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
