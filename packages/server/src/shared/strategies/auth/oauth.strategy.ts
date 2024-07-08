import { Request, Response } from 'express';
import OAuth2Server, {
  Request as OAuth2Request,
  Response as OAuth2Response,
  TokenOptions,
  AuthorizeOptions,
} from 'oauth2-server';
import oauthModel from '../../../config/auth/oauth.model';
import { AuthStrategy } from './auth.strategy';

export class OAuthStrategy implements AuthStrategy {
  options: Record<string, any>;
  oauth: OAuth2Server;

  constructor(options?: Record<string, any>) {
    this.options = options || {};
    this.oauth = new OAuth2Server({
      model: oauthModel,
      ...options,
    });
  }
  async authenticate(
    req: Request & { user: any },
    res: Response
  ): Promise<void> {
    const request = new OAuth2Request(req);
    const response = new OAuth2Response(res);
    const token = await this.oauth.authenticate(request, response);
    req.user = { token: token };
  }

  async token(req: Request, res: Response, options?: TokenOptions) {
    const request = new OAuth2Request(req);
    const response = new OAuth2Response(res);
    return await this.oauth.token(request, response, options);
  }

  async authorize(req: Request, res: Response, options?: AuthorizeOptions) {
    const request = new OAuth2Request(req);
    const response = new OAuth2Response(res);
    return await this.oauth.authorize(request, response, options);
  }
}
