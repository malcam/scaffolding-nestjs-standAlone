import { Command as ICommand } from './command';

export interface ApplicationService<CommandBase extends ICommand = ICommand> {
  process<T extends CommandBase>(command: T): Promise<any>;
}
