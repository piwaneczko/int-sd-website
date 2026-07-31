import React from 'react'
import { Link } from 'react-router-dom'
import { Section, Container } from '../components/layout/container'
import { Card } from '../components/ui/card'

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

const THIRD_PARTIES = [
  { service: 'OpenFreeMap', operator: 'OpenFreeMap', sent: 'Współrzędne kafelków mapy dla wyświetlanego obszaru', why: 'Mapa bazowa' },
  { service: 'Esri World Imagery', operator: 'Esri', sent: 'Współrzędne kafelków mapy dla wyświetlanego obszaru', why: 'Widok satelitarny, po jego włączeniu' },
  { service: 'Overpass API', operator: 'Overpass API (overpass-api.de)', sent: 'Obszar (bounding box) wokół interesującego miejsca', why: 'Obrysy budynków i plany wnętrz' },
  { service: 'Nominatim', operator: 'OpenStreetMap Foundation', sent: 'Tekst wpisany w pole wyszukiwania na mapie', why: 'Wyszukiwanie miejsca po nazwie' },
  { service: 'Kalkulator geomagnetyczny NOAA NCEI', operator: 'Amerykański Narodowy Urząd ds. Oceanów i Atmosfery (NOAA)', sent: 'Szerokość i długość geograficzna', why: 'Deklinacja magnetyczna dla Twojej pozycji' },
  { service: 'int-sd.net', operator: 'I.N.T. Software Development - Paweł Iwaneczko', sent: 'Nic o Tobie; zapytanie o manifest oraz obraz oprogramowania układowego (firmware)', why: 'Sprawdzanie i pobieranie aktualizacji oprogramowania beacona' },
]

// This page is intentionally Polish-only, independent of the site-wide
// language toggle: it is the exact document Google Play's review checks
// against the MINT app's Data safety declaration, so it must not vary with
// the visitor's language setting. See mint/software/docs/play/privacy-policy.md
// for the source (English) text this is translated from.
export function MintPrivacyPage() {
  return (
    <Section>
      <Container maxWidth="md">
        <Link to="/mint" className="text-primary text-sm hover:text-cyan-400 transition-colors mb-6 inline-block">
          ← Powrót do MINT
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Polityka prywatności — MINT</h1>
        <p className="text-deep-500 text-sm mb-8">Ostatnia aktualizacja: 31 lipca 2026</p>

        <Card className="mb-10" hoverEffect={false}>
          <p className="text-deep-300 leading-relaxed text-sm">
            MINT („aplikacja") to aplikacja towarzysząca beaconowi inercyjnemu MINT —
            urządzeniu Bluetooth Low Energy. Ten dokument opisuje, co aplikacja robi
            z danymi. Jest krótki, ponieważ aplikacja robi niewiele: nie ma kont
            użytkowników, analityki, reklam ani śledzenia, a nic nie jest wysyłane na
            serwery obsługiwane przez nas poza sytuacją, gdy poprosisz aplikację
            o sprawdzenie aktualizacji oprogramowania układowego (firmware).
          </p>
          <p className="text-deep-400 text-sm mt-4">
            Administrator danych: I.N.T. Software Development - Paweł Iwaneczko<br />
            Kontakt: piwaneczko@int-sd.net
          </p>
        </Card>

        <div className="space-y-10">
          <div>
            <Heading>Podsumowanie</Heading>
            <Bullets items={[
              'Aplikacja nie ma kont użytkowników i nie zbiera imienia, adresu e-mail, numeru telefonu ani listy kontaktów.',
              'Nie zawiera żadnych SDK reklamowych ani analitycznych i nie korzysta z identyfikatora reklamowego Android.',
              'Dane pomiarowe i logi diagnostyczne pozostają na Twoim urządzeniu.',
              'Twoja przybliżona pozycja jest wysyłana do zewnętrznych usług mapowych i geomagnetycznych, aby aplikacja mogła wyświetlić mapę i obliczyć poprawkę deklinacji magnetycznej. Jest to niezbędne dla tych funkcji i opisane poniżej.',
              'Cały ruch sieciowy wykorzystuje HTTPS.',
            ]} />
          </div>

          <div>
            <Heading>Do czego aplikacja ma dostęp na Twoim urządzeniu</Heading>

            <SubHeading>Lokalizacja</SubHeading>
            <p className="text-deep-400 text-sm leading-relaxed mb-2">
              Aplikacja wymaga dostępu do lokalizacji precyzyjnej (ACCESS_FINE_LOCATION)
              oraz przybliżonej (ACCESS_COARSE_LOCATION). Lokalizacja jest wykorzystywana
              wyłącznie, gdy aplikacja działa na pierwszym planie — aplikacja{' '}
              <strong className="text-white">nie</strong> żąda dostępu do lokalizacji
              w tle i nie może odczytać Twojej pozycji, gdy jest zamknięta.
            </p>
            <p className="text-deep-400 text-sm leading-relaxed mb-2">Lokalizacja jest wykorzystywana do:</p>
            <Bullets items={[
              'wyśrodkowania mapy na Twojej pozycji i jej wyświetlenia;',
              'powiązania sesji nawigacji z rzeczywistym punktem startowym;',
              'pobrania deklinacji magnetycznej i lokalnej grawitacji dla Twojej pozycji oraz zapisania ich w podłączonym beaconie, aby skorygować jego kurs względem miejsca, w którym się znajdujesz;',
              'pobrania obrysu budynku i planu wnętrza wokół wybranego punktu;',
              'opcjonalnego zapisania pozycji w pliku logu diagnostycznego, gdy włączysz logowanie.',
            ]} />

            <SubHeading>Bluetooth</SubHeading>
            <p className="text-deep-400 text-sm leading-relaxed mb-2">
              Aplikacja wymaga uprawnień BLUETOOTH_SCAN oraz BLUETOOTH_CONNECT, aby
              wyszukiwać i łączyć się z beaconami MINT. Skanowanie jest zadeklarowane
              z flagą neverForLocation, co oznacza, że system Android ma zakaz
              umożliwiania aplikacji wyznaczania Twojej lokalizacji na podstawie
              wyników skanowania Bluetooth.
            </p>
            <p className="text-deep-400 text-sm leading-relaxed">
              Identyfikator i nazwa beacona, z którym się łączysz, są zapisywane na
              Twoim urządzeniu, aby aplikacja mogła go rozpoznać następnym razem. Nie
              są nigdzie przesyłane.
            </p>

            <SubHeading>Pliki</SubHeading>
            <p className="text-deep-400 text-sm leading-relaxed mb-2">
              Logi diagnostyczne i telemetryczne są zapisywane jako pliki CSV we
              własnym katalogu multimediów aplikacji (Android/media/net.intsd.mint/).
              Zawierają odczyty z czujników beacona oraz — po włączeniu tej opcji —
              pozycje GPS. Pozostają na Twoim urządzeniu, są wyświetlane na ekranie
              Ustawień aplikacji i można je stamtąd usunąć (lub za pomocą dowolnego
              menedżera plików). Nie są nigdzie przesyłane. Jeśli udostępnisz jakiś
              plik — e-mailem, w chmurze lub przez kabel — jest to Twoje działanie,
              a nie aplikacji.
            </p>
            <p className="text-deep-400 text-sm leading-relaxed">
              Aplikacja nie żąda dostępu do zdjęć, filmów, dźwięku ani współdzielonych
              kolekcji multimediów.
            </p>
          </div>

          <div>
            <Heading>Dane przekazywane podmiotom trzecim</Heading>
            <p className="text-deep-400 text-sm leading-relaxed mb-4">
              Aby rysować mapy i korygować kurs beacona, aplikacja musi odpytywać
              publiczne usługi o Twoje otoczenie. Każde takie zapytanie z konieczności
              ujawnia operatorowi danej usługi przybliżoną informację o tym, gdzie się
              znajdujesz. Do tych zapytań nie jest dołączany żaden identyfikator Ciebie
              ani Twojego urządzenia, a aplikacja nie wysyła wraz z nimi konta, adresu
              e-mail ani identyfikatora reklamowego.
            </p>

            <div className="overflow-x-auto -mx-2 mb-4">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="text-left text-deep-500 text-xs uppercase tracking-wider">
                    <th className="py-2 px-2 font-medium">Usługa</th>
                    <th className="py-2 px-2 font-medium">Operator</th>
                    <th className="py-2 px-2 font-medium">Co jest wysyłane</th>
                    <th className="py-2 px-2 font-medium">Po co</th>
                  </tr>
                </thead>
                <tbody>
                  {THIRD_PARTIES.map((row, i) => (
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

            <p className="text-deep-400 text-sm leading-relaxed mb-2">
              Każdy z tych operatorów przetwarza zapytanie na podstawie własnej
              polityki prywatności. Nie mamy z nimi żadnej umowy, nie otrzymujemy od
              nich żadnych danych zwrotnych o Tobie i nie możemy w Twoim imieniu
              usunąć danych z ich logów.
            </p>
            <p className="text-deep-400 text-sm leading-relaxed">
              Zapytania do int-sd.net dotyczące aktualizacji oprogramowania trafiają
              na serwer obsługiwany przez I.N.T. Software Development - Paweł
              Iwaneczko. Mogą być tam zapisywane standardowe logi serwera WWW (adres
              IP, czas, żądany plik) w celach operacyjnych; nie są one wykorzystywane
              do budowania Twojego profilu.
            </p>
          </div>

          <div>
            <Heading>Czego nie robimy</Heading>
            <Bullets items={[
              'Nie sprzedajemy ani nie wynajmujemy danych.',
              'Nie wykorzystujemy danych do reklamy ani marketingu.',
              'Nie korzystamy z analityki, raportowania awarii ani SDK do atrybucji.',
              'Nie korzystamy z identyfikatora reklamowego Android — aplikacja nie deklaruje uprawnienia AD_ID.',
              'Nie tworzymy profili użytkowników ani nie śledzimy Cię między aplikacjami lub stronami internetowymi.',
            ]} />
          </div>

          <div>
            <Heading>Przechowywanie i usuwanie danych</Heading>
            <p className="text-deep-400 text-sm leading-relaxed mb-2">
              Ponieważ aplikacja przechowuje wszystko na Twoim urządzeniu, retencja
              danych jest pod Twoją kontrolą:
            </p>
            <Bullets items={[
              'usuń pojedyncze pliki logów na ekranie Ustawień lub wszystkie naraz, czyszcząc pamięć aplikacji;',
              'odinstalowanie aplikacji usuwa jej ustawienia oraz zapisane identyfikatory beaconów. Pliki logów zapisane w Android/media/net.intsd.mint/ mogą przetrwać odinstalowanie — z założenia, ponieważ ten katalog ma pozostać dostępny — usuń go ręcznie za pomocą menedżera plików, jeśli chcesz się go pozbyć;',
              'czyszczenie pamięci podręcznej danych mapy jest dostępne osobno w Ustawieniach.',
            ]} />
            <p className="text-deep-400 text-sm leading-relaxed mt-2">
              Nie przechowujemy żadnych Twoich danych osobowych, więc nie mamy czego
              usuwać na Twoje żądanie. Jeśli uważasz inaczej, napisz na
              piwaneczko@int-sd.net.
            </p>
          </div>

          <div>
            <Heading>Podstawa prawna (użytkownicy z UE/EOG)</Heading>
            <p className="text-deep-400 text-sm leading-relaxed mb-2">
              Tam, gdzie ma zastosowanie RODO, opisane powyżej przetwarzanie odbywa
              się w celu realizacji funkcjonalności, o którą prosisz (art. 6 ust. 1
              lit. b RODO) — aplikacja, która wyświetla mapę bez znajomości Twojej
              pozycji, lub koryguje kompas bez znajomości Twojej długości
              geograficznej, nie może działać. Możesz w każdej chwili wycofać
              uprawnienie do lokalizacji w ustawieniach systemu Android; funkcje mapy
              i deklinacji magnetycznej przestaną wtedy działać, a reszta aplikacji
              będzie działać nadal.
            </p>
            <p className="text-deep-400 text-sm leading-relaxed mb-4">
              Przekazywanie danych do wymienionych powyżej usług zewnętrznych stanowi
              przekazanie danych ich odpowiednim operatorom, w tym operatorom spoza
              EOG.
            </p>
            <SubHeading>Prawa osoby, której dane dotyczą</SubHeading>
            <p className="text-deep-400 text-sm leading-relaxed">
              Przysługuje Ci prawo dostępu do danych, ich sprostowania, usunięcia,
              ograniczenia przetwarzania, przenoszenia oraz wniesienia sprzeciwu, a
              także prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych
              Osobowych.
            </p>
          </div>

          <div>
            <Heading>Dzieci</Heading>
            <p className="text-deep-400 text-sm leading-relaxed">
              Aplikacja jest narzędziem do obsługi urządzenia pomiarowego i nie jest
              kierowana do dzieci.
            </p>
          </div>

          <div>
            <Heading>Zmiany</Heading>
            <p className="text-deep-400 text-sm leading-relaxed">
              Jeśli ta polityka ulegnie zmianie, data „ostatniej aktualizacji" powyżej
              zmieni się wraz z nią, a nowa wersja zastąpi tę pod tym samym adresem.
            </p>
          </div>

          <div>
            <Heading>Kontakt</Heading>
            <p className="text-deep-400 text-sm leading-relaxed">
              piwaneczko@int-sd.net
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
