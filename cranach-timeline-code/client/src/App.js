import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {ThemeProvider} from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


//Style Components
import './style/main.style.css';

//Cofig Components
import {theme} from './config/theme.config';
import {useStyles} from './config/usestyles.config';

//Html components
import Timeline from './components/timeline/timeline.component';
import {Graphiclist} from './components/graphiclist/graphiclist.component';
import {Paintinglist} from './components/paintinglist/paintinglist.component';
import {PaintingDetails} from './components/paintinglist/paintingDetails.component';
import ArchivalsList from './components/archivals/archivals.component';
import LiteratursList from './components/literaturs/literaturs.component';
import {Copyright} from './components/copyright/copyright.component';
import {HeaderBar} from './components/appbar/appbar.component';
import {Videoplayer} from './components/videoplayer/videoplayer.component';
import {MediaCard} from './components/mediacard/mediacard.component';

//images
import gemaldeimg from './images/gemalde.jpg';
import archivalienimg from './images/archivalien.jpg';
import literaturimg from './images/literature.jpg';
import graphicimg from './images/gemalde.jpg'
import axios from "axios";


const cards = [
  {
    title: "ENTDECKE DIE GEMÄLDE",
    index: 1,
    image: gemaldeimg,
    link: "/paintings"
  },
  {
    title: "GRAFIKEN",
    index: 2,
    image: graphicimg,
    link: "/graphics"
  },
  {
    title: "ARCHIVALIEN",
    index: 3,
    image: archivalienimg,
    link: "/archivals"
  },
  {
    title: "LITERATUR",
    index: 4,
    image: literaturimg,
    link: "/literatur"
  }
];

function MainApp() {
  const classes = useStyles();
  const [selectedPaint, setPainting] = useState({});
  const [graphics, setGraphics] = useState([]);
  const [paintings, setPaintings] = useState([])
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState({
    yearRange: [1500,1550],
    classification: ""
  })
  console.log("selectedPaint app.js ", selectedPaint);
  const getGraphics = () => {
    axios
      .get(`http://localhost:9000/graphics/search`, {
        params: {
          text: searchText,
          ...filter
        },
      })
      .then((res) => {
        let graphicsList = []
        console.log(typeof res.data)
        Object.values(res.data).map((graphic) => {
          if (graphic.images) graphicsList.push(graphic)
        })
        console.log('graphicsList', graphicsList)
        setGraphics(graphicsList)
      })
  }
  const getPaintings = () => {
    axios
      .get(`http://localhost:9000/painting`, {})
      .then((res) => {
        let paintingList = []
        console.log(typeof res.data)
        Object.values(res.data).map((painting) => {
          if (painting.images) paintingList.push(painting)
        })
        console.log('graphicsList', paintingList)
        setPaintings(paintingList)
      })
  }

  const handleChange = (searchText) => {
    setSearchText(searchText)
    console.log("searchText", searchText)
  }
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  useEffect(() => {
      getGraphics(),
      getGraphics()
  }, [searchText, filter]);

  return (
     <Router>
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <HeaderBar classes={classes} onChange={handleChange} onFilterChange={handleFilterChange} filter={filter}/>
        </div>
        <main>
          <Switch>

            {/*** PAINTINGS PAGE ***/}
            <Route path="/paintings">
              <Container maxWidth="lg">
                  <Typography variant="h3" align="center" className="title-spacing-top">
                    Entdecke die Gemälde
                  </Typography>
                  <Container className={classes.cardGrid} maxWidth="lg">
                    <Paintinglist value={classes} paintings={graphics} setPainting={setPainting} />
                  </Container>
              </Container>
            </Route>
            {/*** END PAINTINGS PAGE ***/}

            {/*** PAINTING DETAILS PAGE ***/}
            <Route path="/paintingdetails">
              <Container maxWidth="lg">
                  <Container className={classes.cardGrid}>
                    <PaintingDetails value={classes} painting={selectedPaint} />
                  </Container>
              </Container>
            </Route>
            {/*** END PAINTING DETAILS PAGE ***/}

            {/*** GRAPHICS PAGE ***/}
            <Route path="/graphics">
              <Container maxWidth="lg">
                  <Typography variant="h3" align="center" className="title-spacing-top">
                    Grafiken
                  </Typography>
                  <Container className={classes.cardGrid} maxWidth="lg">
                    <Paintinglist value={classes} graphics={graphics} setPainting={setPainting} />
                  </Container>
              </Container>
            </Route>
            {/*** END GRAPHICS PAGE ***/}

            {/*** GRAPHIC DETAILS PAGE ***/}
            <Route path="/graphicsdetails">
              <Container maxWidth="lg">
                  <Container className={classes.cardGrid}>
                    <PaintingDetails value={classes} painting={selectedPaint} />
                  </Container>
              </Container>
            </Route>
            {/*** END GRAPHIC DETAILS PAGE ***/}

            {/*** ARCHIVALS PAGE ***/}
            <Route path="/archivals">
              <Container maxWidth="lg">
                  <Typography variant="h3" align="center" className="title-spacing-top">
                    Archivalien
                  </Typography>
                  <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}></Grid>
                    <ArchivalsList value={classes} archivals={graphics} />
                  </Container>
              </Container>
            </Route>
            {/*** END ARCHIVALS PAGE ***/}

            {/*** LITERATUR PAGE ***/}
            <Route path="/literatur">
              <Container maxWidth="lg">
                  <Typography variant="h3" align="center" className="title-spacing-top">
                    Literatur
                  </Typography>
                  <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}></Grid>
                    <LiteratursList value={classes} literaturs={graphics} />
                  </Container>
              </Container>
            </Route>
            {/*** END LITERATUR PAGE ***/}

            {/*** LANDING PAGE ***/}
            <Route path="/">
              <div className={classes.heroContent}>
                {/*** Timeline Container ***/}
                <Container maxWidth="lg">
                  <Timeline />
                </Container>
                {/*** Timeline End ***/}
              </div>
              {/*** PromoVideo Container ***/}
              <Container maxWidth="lg">
                <Typography variant="h3" align="center" className="title-spacing-top">
                  Besichtigung des Lucas Cranach Museums
                </Typography>
                <Typography variant="h6" align="center" className="title-spacing-bottom" gutterBottom>
                  Die größte Online-Bibliothek zu Werken von Lucas Cranach
                </Typography>
                <Videoplayer url="https://www.youtube.com/watch?v=TzTFQqZVL5I"/>
              </Container>
              {/*** PromoVideo End ***/}
              <Typography variant="h3" align="center" className="title-spacing-top">
                Kategorien
              </Typography>
            </Route>
            {/*** END LANDING PAGE ***/}
            
          </Switch>
        </main>
        {/* Categories Nav */}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
                <MediaCard key={card.index} value={card} />
            ))}
          </Grid>
        </Container>
        {/* END Categories Nav */}
        {/* Footer */}
        <footer className={classes.footer}>
          <Copyright />
        </footer>
        {/* End footer */}
      </ThemeProvider>
    </React.Fragment>
     </Router>
  );
}

export default MainApp;