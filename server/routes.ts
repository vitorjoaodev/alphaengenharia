import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { googleSheetsService } from "./google-sheets";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Salvar no Google Sheets
      await googleSheetsService.addContactMessage(validatedData);
      
      // Também manter no storage local como backup
      const message = await storage.createContactMessage(validatedData);
      
      res.json({ 
        success: true, 
        message: "Obrigado! Nossa equipe entrará em contato em breve! Até logo ;)",
        id: message.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dados inválidos fornecidos.",
          errors: error.errors 
        });
      } else {
        console.error('Erro ao processar contato:', error);
        res.status(500).json({ 
          success: false, 
          message: "Erro interno do servidor. Tente novamente mais tarde." 
        });
      }
    }
  });

  // Get contact messages (admin endpoint)
  app.get("/api/contatos", async (req, res) => {
    try {
      const messages = await googleSheetsService.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
      res.status(500).json({ 
        success: false, 
        message: "Erro ao buscar mensagens." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
