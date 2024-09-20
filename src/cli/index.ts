import { addEnumCommand } from './commands/enum/add-enum-command';
import { addStructCommand } from './commands/struct/add-struct-command';
import { addTasksCommand } from './commands/tasks/add-tasks-command';
import { CustomNestFactory } from './custom-nest-factory';
import { RootCommand } from './root-command';

export async function getCommandInstance<TModule>(command: any, module: TModule): Promise<any> {
  const app = await CustomNestFactory.createApplicationContext(module);
  return app.get(command);
}

const version = '0.0.1';

const program = new RootCommand()
  .name('task-scraper') //
  .description('CLI to perform task-scraper actions') //
  .version(version);

addStructCommand('struct', program);
addTasksCommand('tasks', program);
addEnumCommand('enum', program);

(async () => {
  try {
    await program.parseAsync(process.argv);
  } catch (e) {
    console.error(e);
  }
})();

