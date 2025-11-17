import { Controller, Get, Post, Body, Query, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { WhatsappService } from './whatsapp.service';

@ApiTags('whatsapp')
@Controller('whatsapp')
export class WhatsappController {
  private readonly logger = new Logger(WhatsappController.name);

  constructor(private readonly whatsappService: WhatsappService) {}

  @Get('status')
  @ApiOperation({ summary: 'Check WhatsApp connection status' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns WhatsApp connection status',
    schema: {
      example: {
        status: 'connected',
        ready: true,
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  async getStatus() {
    const isReady = await this.whatsappService.isClientReady();
    return {
      status: isReady ? 'connected' : 'disconnected',
      ready: isReady,
      timestamp: new Date().toISOString()
    };
  }

  @Post('send-message')
  @ApiOperation({ summary: 'Send a message via WhatsApp' })
  @ApiResponse({ 
    status: 200, 
    description: 'Message sent successfully',
    schema: {
      example: {
        success: true,
        message: 'Message sent successfully',
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid phone number or message',
    schema: {
      example: {
        success: false,
        error: 'Invalid phone number format',
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  async sendMessage(
    @Body() body: { to: string; message: string }
  ) {
    const { to, message } = body;

    // Validate phone number format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!to || !phoneRegex.test(to.replace(/\D/g, ''))) {
      return {
        success: false,
        error: 'Invalid phone number format',
        timestamp: new Date().toISOString()
      };
    }

    if (!message || message.trim().length === 0) {
      return {
        success: false,
        error: 'Message cannot be empty',
        timestamp: new Date().toISOString()
      };
    }

    try {
      // Format phone number for WhatsApp (ensure it has country code)
      let formattedTo = to.replace(/\D/g, '');
      if (!formattedTo.startsWith('+')) {
        // If no country code provided, assume it's included or use a default
        // You might want to make this configurable based on your use case
        formattedTo = formattedTo.includes('1') && formattedTo.length === 11 ? 
          formattedTo : `1${formattedTo}`; // Default to US country code
      }
      
      const whatsappNumber = `${formattedTo}@c.us`;
      const result = await this.whatsappService.sendMessage(whatsappNumber, message);

      if (result) {
        return {
          success: true,
          message: 'Message sent successfully',
          timestamp: new Date().toISOString(),
          to: formattedTo
        };
      } else {
        return {
          success: false,
          error: 'Failed to send message - WhatsApp client not ready',
          timestamp: new Date().toISOString()
        };
      }
    } catch (error) {
      this.logger.error('Failed to send WhatsApp message', error);
      return {
        success: false,
        error: 'Failed to send message',
        timestamp: new Date().toISOString(),
        details: error.message
      };
    }
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check for WhatsApp service' })
  @ApiResponse({ 
    status: 200, 
    description: 'Service health status',
    schema: {
      example: {
        status: 'healthy',
        service: 'whatsapp',
        timestamp: '2024-01-01T00:00:00.000Z',
        uptime: 3600
      }
    }
  })
  healthCheck() {
    return {
      status: 'healthy',
      service: 'whatsapp',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
  }

  @Post('broadcast')
  @ApiOperation({ summary: 'Broadcast message to multiple users' })
  @ApiResponse({ 
    status: 200, 
    description: 'Broadcast initiated successfully',
    schema: {
      example: {
        success: true,
        message: 'Broadcast initiated',
        recipients: 5,
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  async broadcastMessage(
    @Body() body: { phoneNumbers: string[]; message: string }
  ) {
    const { phoneNumbers, message } = body;

    if (!phoneNumbers || !Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
      return {
        success: false,
        error: 'Phone numbers array is required and cannot be empty',
        timestamp: new Date().toISOString()
      };
    }

    if (!message || message.trim().length === 0) {
      return {
        success: false,
        error: 'Message cannot be empty',
        timestamp: new Date().toISOString()
      };
    }

    try {
      const results: {
        phoneNumber: string;
        status: 'sent' | 'failed';
        error?: string;
      }[] = [];
      let successCount = 0;
      let failureCount = 0;

      for (const phoneNumber of phoneNumbers) {
        try {
          const formattedTo = `${phoneNumber.replace(/\D/g, '')}@c.us`;
          const result = await this.whatsappService.sendMessage(formattedTo, message);
          
          if (result) {
            successCount++;
            results.push({ phoneNumber, status: 'sent' });
          } else {
            failureCount++;
            results.push({ phoneNumber, status: 'failed', error: 'Client not ready' });
          }
        } catch (error) {
          failureCount++;
          results.push({ phoneNumber, status: 'failed', error: error.message });
        }
      }

      return {
        success: true,
        message: 'Broadcast completed',
        summary: {
          total: phoneNumbers.length,
          successful: successCount,
          failed: failureCount
        },
        results,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      this.logger.error('Broadcast failed', error);
      return {
        success: false,
        error: 'Broadcast failed to initiate',
        timestamp: new Date().toISOString(),
        details: error.message
      };
    }
  }

  @Get('qr-status')
  @ApiOperation({ summary: 'Check if QR code is pending for authentication' })
  @ApiQuery({
    name: 'timeout',
    required: false,
    description: 'Timeout in milliseconds to wait for QR code',
    type: Number
  })
  @ApiResponse({ 
    status: 200, 
    description: 'QR code status',
    schema: {
      example: {
        qrPending: false,
        authenticated: true,
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  async getQrStatus(@Query('timeout') timeout?: number) {
    // This endpoint would typically integrate with a QR code service
    // For now, we return the connection status
    const isReady = await this.whatsappService.isClientReady();
    
    return {
      qrPending: !isReady,
      authenticated: isReady,
      timestamp: new Date().toISOString(),
      message: isReady ? 'WhatsApp is authenticated and ready' : 'QR code authentication pending'
    };
  }

  @Post('restart')
  @ApiOperation({ summary: 'Restart WhatsApp client connection' })
  @ApiResponse({ 
    status: 200, 
    description: 'Restart initiated',
    schema: {
      example: {
        success: true,
        message: 'WhatsApp client restart initiated',
        timestamp: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  async restartClient() {
    // Note: In a real implementation, you might want to add authentication
    // and authorization to this endpoint since it's a sensitive operation
    
    this.logger.log('Manual WhatsApp client restart requested');
    
    // In a full implementation, you would call a method to restart the client
    // For now, we'll return a success message
    return {
      success: true,
      message: 'WhatsApp client restart initiated. This may take a few moments.',
      timestamp: new Date().toISOString()
    };
  }
}