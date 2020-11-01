import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React wow
        </a>
      </header>

      <section class="container mb-4">
          <div class="row">
              <div class="col-12">
                  <h3>We stand with small businesses.</h3>
                  During these tough times, we're doing everything we can to help you and your business adapt.
                  <button class="btn-primary btn-border">Get Resources</button>
                  <button class="btn-primary btn-border">View Offers</button>
              </div>
          </div>
      </section>

      <section class="container mb-4">
          <div class="row">
              <div class="col-12">
                  <div class="container bordered-grid">
                      <div class="row">
                          <div class="col-12 col-md-3">
                              <img src="test.jpg" alt="Magento"/>
                              <span class="title">Magento</span>
                          </div>
                          <div class="col-12 col-md-3">
                              <img src="test.jpg" alt="Magento"/>
                              <span class="title">Shopify</span>
                          </div>
                          <div class="col-12 col-md-3">
                              <img src="test.jpg" alt="Magento"/>
                              <span class="title">Spree</span>
                          </div>
                          <div class="col-12 col-md-3">
                              <img src="test.jpg" alt="Magento"/>
                              <span class="title">Woocommerce</span>
                          </div>
                          <div class="col-12 col-md-3">
                              <img src="test.jpg" alt="Magento"/>
                              <span class="title">React</span>
                          </div>
                          <div class="col-12 col-md-3">
                              <img src="test.jpg" alt="Magento"/>
                              <span class="title">Laravel</span>
                          </div>
                          <div class="col-12 col-md-3">
                              <img src="test.jpg" alt="Magento"/>
                              <span class="title">WordPress</span>
                          </div>
                          <div class="col-12 col-md-3">
                              <img src="test.jpg" alt="Magento"/>
                              <span class="title">Node</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section>
          <div class="container-fluid bg-vivid-cyan">
              <div class="row">
                  <div class="container">
                      <div class="row">
                          <div class="col-md-6 col-12">
                              <h5>COVID-19 Small Business Support</h5>
                              <h2>Stay open with free tools and expert advice</h2>
                              <p>With the unique challenged of COVID-19, we're committed to helping you keep your business open</p>
                              <button class="btn-primary">View Offers</button>
                          </div>

                          <div class="col-md-6 col-12">
                              <h5>COVID-19 Small Business Support</h5>
                              <h2>Stay open with free tools and expert advice</h2>
                              <p>With the unique challenged of COVID-19, we're committed to helping you keep your business open</p>
                              <button class="btn-primary">View Offers</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>


      <section class="container">
          <div class="row">
              <div class="col-12 clearfix">
                  <h2>Services</h2>
              </div>
              <div class="col-md-3 col-12">
                  <h2>Web Consultation</h2>
                  <p>Get consultation with our expert on best ecommerce framework that matches your need.</p>
                  <button class="btn-primary">View Offers</button>
              </div>

              <div class="col-md-3 col-12">
                  <h2>E-commerce Web Design and Development</h2>
                  <p>Get the latest industry standard websites that you ll be proud of</p>
                  <button class="btn-primary">View Offers</button>
              </div>

              <div class="col-md-3 col-12">
                  <h2>SEO</h2>
                  <p>Enchancing and optimizing your website in search engine rankings with experts</p>
                  <button class="btn-primary">View Offers</button>
              </div>

              <div class="col-md-3 col-12">
                  <h2>Graphic Design</h2>
                  <p>Free graphic design for over a period once you contrat with us.</p>
                  <button class="btn-primary">View Offers</button>
              </div>
          </div>
      </section>


      <section>
          <div class="row">
              <div class="col-12">
                  <div class="row">
                      <div class="col-sm-12 col-md-7 col-lg-8 d-flex align-items-stretch">

                      </div>
                      <div class="col-sm-12 col-md-5 col-lg-4 d-flex align-items-stretch">

                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section class="container">
          <div class="row">
              <div class="col-12">
                  <div class="row">
                      <div class="col-sm-12 col-md-7 col-lg-7 d-flex align-items-stretch">
                          <h3>We are an agency focused on the touchpoints that matter most today.</h3>
                      </div>
                      <div class="col-sm-12 col-md-5 col-lg-5 d-flex align-items-stretch">
                          <div class="row">
                              <div class="col-sm-6 office">
                                  <div class="location">Kathmandu</div>
                                  <p class="address">Thamel, Infront of Chhaya Complex <br/>+977 9841723637<br/></p>
                              </div>
                              <div class="col-sm-6 office">
                                  <div class="location">Texas</div>
                                  <p class="address">45 West 25th Street, 6th Floor<br/>New York, TX 10010 +1 646 756 5410<br/></p>
                              </div>
                              <div class="col-sm-6 office">
                                  <div class="location">HongKong</div>
                                  <p class="address">45 West 25th Street, 6th Floor<br/>New York, NY 10010 +1 646 756 5410<br/></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}

export default App;
