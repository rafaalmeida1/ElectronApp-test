const { spawn } = require('child_process');
const electron = require('electron');
const net = require('net');

const port = 3000;
const startElectron = () => {
  console.log('Starting Electron...');
  const child = spawn(electron, ['.'], {
    env: {
      ...process.env,
      ELECTRON_START_URL: `http://localhost:${port}`
    }
  });

  child.stdout.on('data', (data) => {
    console.log(`Electron: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`Electron Error: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`Electron process exited with code ${code}`);
  });
};

const tryConnection = () => {
  const client = new net.Socket();

  client.connect({ port }, () => {
    client.destroy();
    startElectron();
  });

  client.on('error', () => {
    setTimeout(tryConnection, 1000);
  });
};

tryConnection();