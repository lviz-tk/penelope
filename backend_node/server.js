const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock database data
const passaros = [
  {
    passaro_id: 1,
    nome_popular: "Araçari-banana",
    nome_binomial: "Selenidera maculirostris",
    estado_conservacao: "Pouco Preocupante",
    passaro_descricao: "Um tucano pequeno com bico amarelo e preto",
    envergadura_cm: 35,
    img_passaro_url: "files_penelope/img_passaro/ramphastos_toco/1.jpg",
    img_passaro_preview_url: "files_penelope/img_passaro/previews/1.jpg"
  },
  {
    passaro_id: 2,
    nome_popular: "Tucano-grande",
    nome_binomial: "Ramphastos toco",
    estado_conservacao: "Pouco Preocupante",
    passaro_descricao: "O maior tucano do Brasil",
    envergadura_cm: 50,
    img_passaro_url: "files_penelope/img_passaro/ramphastos_toco/2.jpg",
    img_passaro_preview_url: "files_penelope/img_passaro/previews/2.jpg"
  }
];

// GET search_passaro.php equivalent
app.get('/backend_penelope/search_passaro.php', (req, res) => {
  res.json({ passaro: passaros });
});

// GET search_avistamento.php equivalent
app.get('/backend_penelope/search_avistamento.php', (req, res) => {
  const passaro_id = req.query.passaro_id;
  const type = req.query.type;
  
  const avistamentos = [];
  
  res.json({ avistamento: avistamentos });
});

// GET get_passaro_artigo.php equivalent
app.get('/backend_penelope/get_passaro_artigo.php', (req, res) => {
  const passaro_id = req.query.passaro_id;
  
  const artigo = {
    nome_popular: "Tucano-grande",
    nome_binomial: "Ramphastos toco",
    estado_conservacao: "Pouco Preocupante",
    passaro_descricao: "O maior tucano do Brasil com descrição completa",
    envergadura_cm: 50,
    img_passaro: {
      1: "files_penelope/img_passaro/ramphastos_toco/1.jpg",
      2: "files_penelope/img_passaro/ramphastos_toco/2.jpg"
    },
    canto_filepath: "files_penelope/canto/ramphastos_toco/canto.mp3",
    avistamento_img_count: 5,
    avistamento_audio_count: 3,
    avistamento_video_count: 2
  };
  
  res.json({ artigo });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
