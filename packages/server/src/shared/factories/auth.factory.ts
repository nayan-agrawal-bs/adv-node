import { AuthStrategy } from '../strategies/auth/auth.strategy';

export class AuthFactory {
  static strategies: Record<string, AuthStrategy> = {};

  static register(strategyType: string, strategy: AuthStrategy) {
    this.strategies[strategyType.toLowerCase()] = strategy;
  }

  static get(strategyType: string): AuthStrategy {
    const strategy = this.strategies[strategyType.toLowerCase()];

    if (!strategy) {
      throw new Error(`Authentication strategy '${strategyType}' not found`);
    }

    return strategy;
  }
}
