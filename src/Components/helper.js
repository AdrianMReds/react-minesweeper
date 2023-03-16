export const getIcon = (name) => {
  let i;
  switch (name) {
    case "milan":
      i = "https://assets-sports.thescore.com/soccer/team/8/logo.png";
      break;
    case "liverpool":
      i = "https://cdn-icons-png.flaticon.com/512/738/738663.png";
      break;
    case "bayern":
      i = "https://cdn-icons-png.flaticon.com/512/738/738658.png";
      break;
    case "barcelona":
      i = "https://cdn-icons-png.flaticon.com/512/738/738657.png";
      break;
    case "ajax":
      i = "https://assets-sports.thescore.com/soccer/team/269/logo.png";
      break;
    case "manchester_united":
      i = "https://cdn-icons-png.flaticon.com/512/824/824727.png";
      break;
    case "inter_milan":
      i =
        "https://www.latingoles.com/wp-content/uploads/2020/06/FC-Internazionale.png";
      break;
    case "chelsea":
      i = "https://cdn-icons-png.flaticon.com/512/738/738656.png";
      break;
    case "nottingham_forest":
      i =
        "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Nottingham-Forest-icon.png";
      break;
    case "benfica":
      i =
        "https://icons.iconarchive.com/icons/giannis-zographos/portugese-football-club/256/Benfica-icon.png";
      break;
    case "juventus":
      i = "https://cdn-icons-png.flaticon.com/512/738/738724.png";
      break;
    case "porto":
      i =
        "https://icons.iconarchive.com/icons/giannis-zographos/portugese-football-club/256/FC-Porto-icon.png";
      break;
    case "dortmund":
      i = "https://cdn-icons-png.flaticon.com/512/738/738654.png";
      break;
    case "feyenoord":
      i =
        "https://icons.iconarchive.com/icons/giannis-zographos/dutch-football-club/256/Feyenoord-icon.png";
      break;
    case "marseille":
      i =
        "https://icons.iconarchive.com/icons/giannis-zographos/french-football-club/256/Olumpique-de-Marseille-icon.png";
      break;
    case "aston_villa":
      i = "http://acefootball.com/wp-content/uploads/ptl/team-10252-medium.png";
      break;
    case "hamburg":
      i =
        "https://images.fotmob.com/image_resources/logo/teamlogo/9790_large.png";
      break;
    case "crvena_zvezda":
      i =
        "https://b.thumbs.redditmedia.com/8MckLRmsgQkDwN-RuLED7qKngb5M-c-oy8eFbdN6s1g.png";
      break;
    case "fcsb":
      i = "https://www.fifplay.com/img/fifa-mobile/20/clubs/100761.png";
      break;
    case "psv":
      i =
        "https://icons.iconarchive.com/icons/giannis-zographos/dutch-football-club/256/PSV-Eindhoven-icon.png";
      break;
    case "celtic":
      i =
        "https://styles.redditmedia.com/t5_2snki/styles/communityIcon_qm1c2cxv45ka1.png?width=256&s=44a25eabebb713f58925ed788fd8a6a914472783";
      break;
  }
  return i;
};

export const sizes = {
  facil: { columns: 10, mines: 12 },
  medio: { columns: 15, mines: 40 },
  dificil: { columns: 20, mines: 75 },
};

const addNumbers = (b) => {
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < b[i].length; j++) {
      if (b[i][j].value === 9) {
        //Upper row
        if (i > 0) {
          if (j > 0) {
            b[i - 1][j - 1].value += b[i - 1][j - 1].value === 9 ? 0 : 1;
          }
          b[i - 1][j].value += b[i - 1][j].value === 9 ? 0 : 1;
          if (j < b[i].length - 1) {
            b[i - 1][j + 1].value += b[i - 1][j + 1].value === 9 ? 0 : 1;
          }
        }
        //Middle row (sides)
        if (j > 0) {
          b[i][j - 1].value += b[i][j - 1].value === 9 ? 0 : 1;
        }
        if (j < b[i].length - 1) {
          b[i][j + 1].value += b[i][j + 1].value === 9 ? 0 : 1;
        }
        //Lower rows
        if (i < b.length - 1) {
          if (j > 0) {
            b[i + 1][j - 1].value += b[i + 1][j - 1].value === 9 ? 0 : 1;
          }
          b[i + 1][j].value += b[i + 1][j].value === 9 ? 0 : 1;
          if (j < b[i].length - 1) {
            b[i + 1][j + 1].value += b[i + 1][j + 1].value === 9 ? 0 : 1;
          }
        }
      }
    }
  }
  return b;
};

const generateBoard = (diff) => {
  let boardArray = new Array(sizes[diff].columns).fill(
    new Array(sizes[diff].columns).fill()
  );

  const randomArray = Array.from(Array(sizes[diff].columns ** 2).keys());

  let counter = 0;
  let board = [];
  let mines = [];
  //Generate mine locations
  for (let i = 0; i < sizes[diff].mines; i++) {
    let rndm = Math.floor(Math.random() * randomArray.length);

    mines.push(randomArray[rndm]);
    randomArray.splice(rndm, 1);
  }
  //Board generation
  for (let x = 0; x < boardArray.length; x++) {
    board.push([]);
    for (let y = 0; y < boardArray.length; y++) {
      let num = mines.includes(counter) ? 9 : 0;
      board[x].push({
        value: num,
        status: "b",
        coords: { x: x, y: y },
      });
      counter += 1;
    }
  }
  console.log(boardArray);
  board = addNumbers(board);
  return board;
};

export default generateBoard;
