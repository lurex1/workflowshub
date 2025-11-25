import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">
            Polityka prywatności
          </h1>
          
          <Card className="p-6 md:p-8 card-gradient border-primary/20">
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-muted-foreground mb-6">
                Poniższa Polityka Prywatności określa zasady zapisywania i uzyskiwania dostępu do danych na Urządzeniach Użytkowników korzystających z serwisu MercuryHub (marketplace automatyzacji, na którym developerzy wystawiają swoje automatyzacje na sprzedaż) do celów świadczenia usług drogą elektroniczną przez Administratora oraz zasady gromadzenia i przetwarzania danych osobowych Użytkowników, które zostały podane przez nich osobiście i dobrowolnie za pośrednictwem narzędzi dostępnych w Serwisie.
              </p>
              
              <p className="text-sm text-muted-foreground mb-8">
                Data ostatniej aktualizacji: 20.10.2025
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§1 Definicje</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong className="text-foreground">Serwis</strong> – serwis internetowy prowadzony przez Administratora pod adresem: mercuryhub.pl oraz ewentualnie innymi domenami/subdomenami powiązanymi (np. mercuryhub.com) służący jako marketplace automatyzacji, w ramach którego developerzy mogą oferować swoje automatyzacje na sprzedaż, a Użytkownicy mogą je przeglądać, kupować i z nich korzystać.</p>
                  
                  <p><strong className="text-foreground">Serwis zewnętrzny</strong> – serwisy internetowe partnerów, usługodawców lub usługobiorców współpracujących z Administratorem (np. systemy płatności, narzędzia analityczne, platformy mailingowe, narzędzia automatyzacji).</p>
                  
                  <p><strong className="text-foreground">Administrator Serwisu / Danych (Administrator)</strong> – Paweł Eberle, prowadzący nierejestrowaną działalność gospodarczą pod nazwą Paveelo, adres: ul. Zamojskiego 18H/2, 37-450 Stalowa Wola, e-mail: eberlepawel@gmail.com.</p>
                  
                  <p><strong className="text-foreground">Użytkownik</strong> – osoba fizyczna korzystająca z Serwisu, w szczególności: developer (twórca automatyzacji wystawiający je na sprzedaż) oraz klient (osoba kupująca lub korzystająca z automatyzacji).</p>
                  
                  <p><strong className="text-foreground">Urządzenie</strong> – elektroniczne urządzenie wraz z oprogramowaniem, za pośrednictwem którego Użytkownik uzyskuje dostęp do Serwisu (komputer, smartfon, tablet itp.).</p>
                  
                  <p><strong className="text-foreground">Cookies (ciasteczka)</strong> – dane tekstowe gromadzone w formie plików zamieszczanych na Urządzeniu Użytkownika.</p>
                  
                  <p><strong className="text-foreground">RODO</strong> – Rozporządzenie (UE) 2016/679.</p>
                  
                  <p><strong className="text-foreground">Dane osobowe</strong> – informacje o zidentyfikowanej lub możliwej do zidentyfikowania osobie fizycznej.</p>
                  
                  <p><strong className="text-foreground">Przetwarzanie</strong> – operacje na danych osobowych w rozumieniu art. 4 pkt 2 RODO.</p>
                  
                  <p><strong className="text-foreground">Ograniczenie przetwarzania, Profilowanie, Zgoda, Naruszenie ochrony danych, Pseudonimizacja, Anonimizacja</strong> – zgodnie z definicjami w art. 4 RODO.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§2 Inspektor Ochrony Danych</h2>
                <p className="text-muted-foreground">
                  Na podstawie art. 37 RODO Administrator nie powołał Inspektora Ochrony Danych. Kontakt w sprawach ochrony danych: <a href="mailto:eberlepawel@gmail.com" className="text-primary hover:underline">eberlepawel@gmail.com</a>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§3 Rodzaje plików Cookies</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong className="text-foreground">Cookies wewnętrzne</strong> – zapisywane i odczytywane przez system Serwisu (np. mechanizmy logowania, koszyka, panelu developera, ustawień konta).</p>
                  
                  <p><strong className="text-foreground">Cookies zewnętrzne</strong> – zapisywane i odczytywane przez systemy Serwisów zewnętrznych (np. Google, Meta, LinkedIn, systemy płatności, narzędzia automatyzacji/obsługi klienta).</p>
                  
                  <p><strong className="text-foreground">Cookies sesyjne</strong> – usuwane po zakończeniu sesji przeglądarki.</p>
                  
                  <p><strong className="text-foreground">Cookies trwałe</strong> – przechowywane do czasu ich ręcznego usunięcia lub wygaśnięcia.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§4 Bezpieczeństwo składowania danych</h2>
                <p className="text-muted-foreground mb-3">
                  Mechanizmy zapisu/odczytu cookies działają poprzez przeglądarkę internetową i nie umożliwiają pobierania innych danych z Urządzenia Użytkownika ani uruchamiania złośliwego oprogramowania. Administrator stosuje środki techniczne i organizacyjne adekwatne do ryzyka (art. 32 RODO), w tym m.in. szyfrowanie połączeń (SSL/TLS), kontrolę dostępu, stosowne systemy uprawnień oraz kopie zapasowe.
                </p>
                <p className="text-muted-foreground mb-3">
                  Użytkownik odpowiada za bezpieczeństwo swojego Urządzenia (aktualizacje, oprogramowanie antywirusowe, hasła, nieudostępnianie konta osobom trzecim).
                </p>
                <p className="text-muted-foreground">
                  Użytkownik może w każdej chwili zmienić ustawienia cookies w przeglądarce (Chrome, Firefox, Safari, Edge, Opera) lub poprzez baner/menedżer zgód w Serwisie, a także usunąć zapisane cookies. Ograniczenie stosowania cookies może mieć wpływ na działanie niektórych funkcji Serwisu (np. logowanie, panel sprzedawcy, koszyk, system płatności).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§5 Cele, do których wykorzystywane są pliki Cookies</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong className="text-foreground">Niezbędne/techniczne</strong> – zapewnienie prawidłowego działania Serwisu (podstawowe funkcje, logowanie, utrzymanie sesji, obsługa panelu developera i kupującego, koszyk, proces zakupowy).</p>
                  
                  <p><strong className="text-foreground">Analityczne/statystyczne</strong> – pomiar i analiza ruchu oraz korzystania z Serwisu (np. Google Analytics lub inne narzędzia analityczne), optymalizacja działania Serwisu, poprawa użyteczności platformy MercuryHub dla developerów i klientów.</p>
                  
                  <p><strong className="text-foreground">Marketingowe</strong> – remarketing i dopasowanie treści reklam (np. Meta Pixel, Google Ads, LinkedIn Ads, inne systemy reklamowe), w tym wyświetlanie reklam MercuryHub i ofert automatyzacji poza Serwisem.</p>
                  
                  <p><strong className="text-foreground">Funkcjonalne</strong> – osadzanie treści zewnętrznych (np. filmy instruktażowe YouTube, wbudowane formularze, chaty, kalendarze do umawiania konsultacji).</p>
                </div>
                <p className="text-muted-foreground mt-3">
                  Stosowanie cookies innych niż niezbędne odbywa się na podstawie zgody Użytkownika, którą można w każdej chwili cofnąć poprzez ustawienia przeglądarki lub menedżer zgód w Serwisie.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§6 Cele przetwarzania danych osobowych</h2>
                <p className="text-muted-foreground mb-3">
                  Dane podawane dobrowolnie przez Użytkownika (np. w formularzu rejestracji konta, formularzu kontaktowym, panelu developera lub przy zakupie automatyzacji) są przetwarzane w szczególności w następujących celach:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-3">
                  <li>założenie i obsługa konta Użytkownika w Serwisie (developer, kupujący), obsługa marketplace'u (publikacja ofert automatyzacji, realizacja transakcji, kontakt w sprawach zamówień, rozliczeń, wsparcia) – art. 6 ust. 1 lit. b RODO;</li>
                  <li>kontakt i obsługa zapytań (formularze kontaktowe, e-mail, czat) – art. 6 ust. 1 lit. b lub f RODO;</li>
                  <li>marketing bezpośredni, w tym newsletter (jeśli zostanie uruchomiony) – art. 6 ust. 1 lit. a RODO;</li>
                  <li>ustalenie, dochodzenie lub obrona przed roszczeniami związanymi z korzystaniem z Serwisu, automatyzacjami lub rozliczeniami – art. 6 ust. 1 lit. f RODO;</li>
                  <li>realizacja obowiązków prawnych (np. podatkowych, rachunkowych) – art. 6 ust. 1 lit. c RODO.</li>
                </ul>
                <p className="text-muted-foreground mb-3">
                  Dane zbierane automatycznie (adres IP, identyfikatory cookies, dane o urządzeniu i aktywności w Serwisie) mogą być wykorzystywane w celach:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>analityka/statystyka – art. 6 ust. 1 lit. a lub f RODO;</li>
                  <li>bezpieczeństwo i administracja systemem (monitorowanie ruchu, wykrywanie nadużyć, próby włamań, ochrona przed spamem) – art. 6 ust. 1 lit. f RODO;</li>
                  <li>marketing/remarketing – art. 6 ust. 1 lit. a RODO.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§7 Pliki Cookies Serwisów zewnętrznych</h2>
                <p className="text-muted-foreground mb-3">
                  W Serwisie mogą działać skrypty i komponenty partnerów, które umieszczają własne cookies, w tym w szczególności:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-3">
                  <li>Google (Google Analytics, Google Ads/Tag Manager, YouTube) – polityka prywatności: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/privacy</a></li>
                  <li>Meta Platforms (Facebook/Instagram – Pixel) – polityka: <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.facebook.com/policy.php</a></li>
                  <li>LinkedIn (Insight Tag) – polityka: <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.linkedin.com/legal/privacy-policy</a></li>
                </ul>
                <p className="text-muted-foreground">
                  W przyszłości w Serwisie mogą być stosowane także inne narzędzia analityczne lub marketingowe (np. Hotjar, Microsoft Clarity, TikTok Pixel, Pinterest Tag, HubSpot, ActiveCampaign, Typeform, Tidio, Calendly, systemy płatności online, narzędzia do automatyzacji marketingu lub obsługi klienta), które mogą umieszczać własne pliki cookies lub korzystać z podobnych technologii śledzenia.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§8 Rodzaje gromadzonych danych</h2>
                <p className="text-muted-foreground mb-3">
                  <strong className="text-foreground">Dane gromadzone automatycznie (anonimowe/pseudonimowe):</strong> adres IP, typ przeglądarki, system operacyjny, rozdzielczość ekranu, język interfejsu, przybliżona lokalizacja, adresy URL odwiedzanych podstron, czas wizyty, strona odsyłająca (referrer), identyfikatory cookies/urządzenia, dane o korzystaniu z Serwisu (zdarzenia, kliknięcia, sposób poruszania się po Serwisie).
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Dane podawane dobrowolnie przez Użytkownika:</strong> imię, nazwisko, nazwa użytkownika (login), e-mail, hasło (przechowywane w postaci zaszyfrowanej/hashowanej), dane rozliczeniowe (np. dane do faktury, jeśli je podasz), dane firmy (jeżeli dotyczy), treść wiadomości w formularzach, dane związane z ofertami automatyzacji (opisy, nazwy, materiały), dane transakcyjne (np. informacje o zakupionych automatyzacjach).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§9 Dostęp do danych przez podmioty trzecie</h2>
                <p className="text-muted-foreground mb-3">
                  Co do zasady odbiorcą danych jest Administrator. Dane mogą być udostępniane lub powierzane podmiotom świadczącym na rzecz Administratora usługi niezbędne do funkcjonowania Serwisu MercuryHub, w tym w szczególności:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>dostawcy hostingu i infrastruktury serwerowej (np. Vercel, inni dostawcy chmury/hostingu);</li>
                  <li>dostawcy narzędzi do automatyzacji (np. n8n lub podobne, jeżeli są używane do obsługi formularzy i procesów);</li>
                  <li>dostawcy narzędzi analitycznych (np. Google Analytics), marketingowych (Google Ads, Meta, LinkedIn, inne systemy reklamowe) oraz mailingowych;</li>
                  <li>dostawcy systemów płatności online (np. Stripe, PayPal, inne bramki płatnicze);</li>
                  <li>dostawcy oprogramowania biurowego (np. Google Workspace – poczta, dokumenty);</li>
                  <li>podmioty świadczące usługi księgowe, prawne lub doradcze.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§10 Sposób przetwarzania danych, przekazywanie poza EOG, profilowanie</h2>
                <p className="text-muted-foreground mb-3">
                  Dane nie są sprzedawane podmiotom trzecim. Dane mogą być przekazywane poza Europejski Obszar Gospodarczy (np. do USA) w związku z korzystaniem z narzędzi dostawców mających serwery lub siedziby poza EOG (np. Google, Meta, narzędzia mailingowe, dostawcy hostingu). W takim przypadku Administrator zapewnia stosowanie legalnych mechanizmów przekazywania danych, zgodnych z RODO (np. Standardowe Klauzule Umowne, inne odpowiednie zabezpieczenia).
                </p>
                <p className="text-muted-foreground">
                  Dane mogą być przetwarzane w sposób zautomatyzowany, w tym profilowane dla celów analitycznych i marketingowych/remarketingowych (np. dobór reklam MercuryHub lub ofert automatyzacji do zainteresowań Użytkownika na podstawie jego aktywności). Decyzje podejmowane na tej podstawie nie wywołują wobec Użytkownika skutków prawnych i nie stanowią zautomatyzowanego podejmowania decyzji w rozumieniu art. 22 RODO.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§11 Podstawy prawne przetwarzania danych</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>art. 6 ust. 1 lit. a RODO – zgoda (np. na określone cookies, newsletter, wybrane formy marketingu);</li>
                  <li>art. 6 ust. 1 lit. b RODO – wykonanie umowy lub działania przedumowne (zakładanie konta, obsługa marketplace'u, proces zakupowy);</li>
                  <li>art. 6 ust. 1 lit. c RODO – spełnienie obowiązków prawnych (np. podatkowych, rachunkowych);</li>
                  <li>art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes Administratora (analiza, statystyka, rozwój Serwisu, bezpieczeństwo systemu, dochodzenie roszczeń, marketing bezpośredni).</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§12 Okres przetwarzania danych osobowych</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>dane przetwarzane na podstawie zgody – do czasu jej cofnięcia lub osiągnięcia celu przetwarzania;</li>
                  <li>dane przetwarzane na podstawie uzasadnionego interesu Administratora – do czasu wniesienia skutecznego sprzeciwu lub upływu okresów przedawnienia roszczeń;</li>
                  <li>dane księgowe/podatkowe – przez okres wymagany przepisami prawa (obecnie co do zasady 5 lat licząc od końca roku podatkowego);</li>
                  <li>dane w logach bezpieczeństwa – przez okres niezbędny do celów bezpieczeństwa, analityki i dowodowych.</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  Po upływie właściwych okresów dane są usuwane lub poddawane anonimizacji.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§13 Prawa Użytkowników związane z przetwarzaniem danych osobowych</h2>
                <p className="text-muted-foreground mb-3">
                  Użytkownikowi przysługują prawa wynikające z RODO, w szczególności:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-3">
                  <li>prawo dostępu do danych, ich sprostowania, usunięcia („prawo do bycia zapomnianym"), ograniczenia przetwarzania, prawo do przenoszenia danych;</li>
                  <li>prawo sprzeciwu wobec przetwarzania danych (w tym wobec marketingu bezpośredniego oraz wobec przetwarzania opartego na uzasadnionym interesie Administratora);</li>
                  <li>prawo cofnięcia zgody w dowolnym momencie (cofnięcie nie wpływa na zgodność z prawem przetwarzania dokonanego przed cofnięciem);</li>
                  <li>prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.</li>
                </ul>
                <p className="text-muted-foreground">
                  Wnioski dotyczące realizacji ww. praw można składać na adres e-mail Administratora (<a href="mailto:eberlepawel@gmail.com" className="text-primary hover:underline">eberlepawel@gmail.com</a>) lub listownie na adres: ul. Zamojskiego 18H/2, 37-450 Stalowa Wola. Administrator odpowiada bez zbędnej zwłoki, nie później niż w ciągu 1 miesiąca od otrzymania wniosku.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§14 Kontakt do Administratora</h2>
                <p className="text-muted-foreground">
                  Administratorem danych jest Paweł Eberle, prowadzący nierejestrowaną działalność gospodarczą pod nazwą Paveelo, adres: ul. Zamojskiego 18H/2, 37-450 Stalowa Wola, e-mail: <a href="mailto:eberlepawel@gmail.com" className="text-primary hover:underline">eberlepawel@gmail.com</a>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§15 Wymagania Serwisu</h2>
                <p className="text-muted-foreground">
                  Ograniczenie zapisu/odczytu cookies (np. blokada w przeglądarce lub brak zgody na cookies nieniezbędne) może spowodować nieprawidłowe działanie części funkcji Serwisu MercuryHub, w szczególności logowania, panelu developera, systemu zakupowego, integracji z systemami płatności, wyświetlania zewnętrznych treści oraz działania narzędzi analitycznych.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§16 Linki zewnętrzne</h2>
                <p className="text-muted-foreground">
                  W Serwisie mogą znajdować się odnośniki (linki) do stron zewnętrznych, w tym stron developerów, którzy oferują automatyzacje, dokumentacji technicznej, platform społecznościowych, systemów płatności i innych usług. Administrator nie odpowiada za treść tych stron ani za zasady przetwarzania danych osobowych na tych stronach. Zaleca się zapoznanie z politykami prywatności tych podmiotów.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">§17 Zmiany w Polityce Prywatności</h2>
                <p className="text-muted-foreground">
                  Administrator może zmieniać niniejszą Politykę Prywatności w zakresie dotyczącym danych anonimowych/cookies bez indywidualnego powiadamiania każdego Użytkownika. W zakresie przetwarzania danych osobowych – o istotnych zmianach Administrator poinformuje poprzez publikację zaktualizowanej wersji Polityki w Serwisie, a w przypadku posiadania danych kontaktowych Użytkowników – także poprzez stosowną wiadomość (np. e-mail). Dalsze korzystanie z Serwisu po opublikowaniu zmian oznacza akceptację nowej treści Polityki Prywatności.
                </p>
              </section>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;