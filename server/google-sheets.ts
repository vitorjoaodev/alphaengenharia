import { google } from 'googleapis';
import path from 'path';

const SHEET_ID = '13okiOKuxqznV62jsqiWTFz5RevTgX5NWgSb3Yp3Kc1E';
const RANGE = 'A:G'; // Nome | Email | Telefone | Assunto | Empresa | Mensagem | Data

class GoogleSheetsService {
  private sheets: any;
  
  constructor() {
    this.initializeSheets();
  }
  
  private async initializeSheets() {
    try {
      const credentialsPath = path.join(process.cwd(), 'credentials.json');
      const auth = new google.auth.GoogleAuth({
        keyFile: credentialsPath,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      
      this.sheets = google.sheets({ version: 'v4', auth });
    } catch (error) {
      console.error('Erro ao inicializar Google Sheets:', error);
      throw error;
    }
  }
  
  async addContactMessage(data: {
    nome: string;
    email: string;
    telefone: string;
    assunto: string;
    empresa: string;
    mensagem: string;
  }) {
    try {
      const currentDate = new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      const values = [[
        data.nome,
        data.email,
        data.telefone,
        data.assunto,
        data.empresa,
        data.mensagem,
        currentDate
      ]];
      
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: RANGE,
        valueInputOption: 'USER_ENTERED',
        resource: { values },
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar dados na planilha:', error);
      throw error;
    }
  }
  
  async getContactMessages() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: RANGE,
      });
      
      const rows = response.data.values || [];
      if (rows.length === 0) return [];
      
      // Remove o cabeçalho e converte para objetos
      const [header, ...dataRows] = rows;
      return dataRows.map(row => ({
        nome: row[0] || '',
        email: row[1] || '',
        telefone: row[2] || '',
        assunto: row[3] || '',
        empresa: row[4] || '',
        mensagem: row[5] || '',
        data: row[6] || ''
      }));
    } catch (error) {
      console.error('Erro ao buscar dados da planilha:', error);
      throw error;
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();