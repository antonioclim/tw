# Whisper Directory Transcriber (starterkit)

Această aplicație permite transcrierea **tuturor fișierelor `.mp4` dintr-un director** într-un format text (`.srt` sau `.txt`), folosind motorul de recunoaștere vocală **Whisper** prin biblioteca Python `faster-whisper`.

Backend-ul este scris în **Node.js/Express** (port 8080), iar inferența efectivă este realizată de scriptul Python `transcribe_fw.py`.

---

## 1. Cerințe și dependențe

Pe lângă `npm install`, aplicația are nevoie de:

1. **Node.js** (16+ recomandat).
2. **Python 3.10+** instalat și accesibil ca `py` / `python` / `python3` în PATH.
3. **ffmpeg** instalat și accesibil în PATH.
4. Pachetul Python **faster-whisper** instalat în mediul Python utilizat.

### 1.1. Verificare Python

Într-un terminal:

```bash
python --version
# sau
py --version
```

Dacă nu există, instalați de la: https://www.python.org/downloads/  
Pe Windows, bifați opțiunea **"Add Python to PATH"** în timpul instalării.

### 1.2. Instalare ffmpeg

- **Windows**: descărcare de la https://ffmpeg.org/download.html sau folosind un manager de pachete (ex. Chocolatey: `choco install ffmpeg`).
- **macOS (Homebrew)**:

```bash
brew install ffmpeg
```

- **Linux (Debian/Ubuntu)**:

```bash
sudo apt-get install ffmpeg
```

Verificați:

```bash
ffmpeg -version
```

### 1.3. Instalare `faster-whisper`

```bash
pip install -U faster-whisper
# sau, dacă aveți mai multe versiuni de Python:
python -m pip install -U faster-whisper
```

Dacă folosiți `py` pe Windows:

```bash
py -m pip install -U faster-whisper
```

### 1.4. Verificare rapidă a scriptului Python

Din directorul aplicației:

```bash
python transcribe_fw.py --help
```

Dacă vedeți mesajul de help și nu apar erori, `faster-whisper` este instalat corect.

---

## 2. Instalare Node.js (backend)

Din directorul în care ați dezarhivat starterkit-ul:

```bash
npm install
```

Acest pas instalează dependența `express`.

---

## 3. Rulare aplicație

Porniți backend-ul:

```bash
npm start
```

Veți vedea în terminal un mesaj de tip:

```text
Serverul ruleaza la http://localhost:8080
Folosesc Python: python
```

Apoi deschideți în browser:

```text
http://localhost:8080
```

---

## 4. Utilizare (din interfața web)

În pagina principală (`index.html` servită de server):

1. În câmpul **„Director video (fișiere .mp4)”** introduceți calea către directorul în care se află fișierele `.mp4` pe care doriți să le transcrieți.
   - Exemplu Windows: `Z:\tw\lectii\cursuri`
   - Exemplu Linux/macOS: `/home/user/videos`

2. Alegeți **formatul de ieșire**:
   - `SRT` – fișiere de subtitrare (cu timecode-uri).
   - `TXT` – text simplu concatenat.

3. Configurați **modelul faster-whisper**:
   - `large-v3` (implicit) – cel mai precis, dar și cel mai lent.
   - `medium`, `small`, `base` – mai rapide, dar mai puțin precise.

4. Alegeți **device**:
   - `cpu` – rulează pe procesor (portabil, dar mai lent).
   - `cuda` – rulează pe GPU NVIDIA (dacă driverele sunt instalate și Python vede GPU-ul).
   - `auto` – lasă librăria să decidă.

5. Alegeți **compute type**:
   - `int8` (implicit) – mai eficient ca memorie, potrivit pentru CPU.
   - `int8_float16`, `float16` etc. – utile pentru GPU și mașini cu suport FP16.

6. Alegeți **limba**:
   - cod ISO 639-1 (`ro`, `en`, `fr` etc.) sau
   - `auto` pentru autodetecție.

7. Apăsați butonul **„Pornește transcrierea”**.

Backend-ul va:
- enumera toate fișierele `.mp4` din director;
- pentru fiecare fișier `X.mp4` va apela `transcribe_fw.py` și va produce:
  - `X.srt` sau
  - `X.txt` (în același director),
  în funcție de formatul ales.

Rezultatul (log-ul) apare în zona „Rezultat / Log” din pagină.

---

## 5. Checklist instalare (resumat)

În interfața web există o casetă „Checklist instalare”, dar, succint:

1. Python 3.10+ în PATH (`python --version` funcționează).
2. `ffmpeg` în PATH (`ffmpeg -version` funcționează).
3. `faster-whisper` instalat (`pip install -U faster-whisper`).
4. `npm install` rulat în directorul aplicației.
5. `npm start` pentru pornirea serverului.

---

## 6. Mesaje de eroare frecvente și interpretarea lor

- **„Nu am gasit nicio comanda Python (py/python/python3) in PATH”**  
  ⇒ Python nu este instalat sau nu este în PATH. Revedeți secțiunea 1.1.

- **„Fisierul de intrare nu exista”** (din `transcribe_fw.py`)  
  ⇒ căile către fișierele video nu sunt valide (de exemplu, directorul nu este cel corect).

- **„Eroare la initializarea modelului Whisper: ...”**  
  ⇒ problemă la descărcarea modelului, la CUDA sau la tipul de `compute_type`.  
  Verificați conexiunea la internet (prima rulare descarcă modelul) și configurația GPU-ului, dacă folosiți `cuda`.

- **Mesaj JSON cu `hint` în răspunsul HTTP**  
  ⇒ backend-ul încearcă să vă ghideze spre secțiunea relevantă din README (Python/ffmpeg/faster-whisper).

---

## 7. Structura proiectului

```text
whisper-directory-transcriber/
 ├─ package.json
 ├─ server.js
 ├─ transcribe_fw.py
 └─ public/
     └─ index.html
```

- `server.js` – backend Node.js/Express (port 8080).
- `transcribe_fw.py` – motorul de transcriere Python (faster-whisper).
- `public/index.html` – interfață web simplă pentru configurare și lansare transcriere.

---

## 8. Observații finale

- Modelul `large-v3` este foarte precis, dar poate fi lent pe CPU și consumă multă memorie. Pentru testare rapidă pe laptop-uri fără GPU, puteți începe cu `small` sau `medium`.
- Pentru utilizare intensivă pe GPU, asigurați-vă că driverele NVIDIA și CUDA sunt corect instalate și că pachetul `faster-whisper` poate utiliza GPU-ul.
- Aplicația procesează fișierele **secvențial**, pentru a evita supraîncărcarea sistemului; dacă doriți, se poate adăuga ulterior procesare paralelă controlată (de ex. 2–3 fișiere în paralel).

