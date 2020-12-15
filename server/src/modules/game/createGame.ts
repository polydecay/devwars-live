import { Team } from '../team/team.model';
import { Editor } from '../editor/editor.model';
import { Game } from './game.model';
import { CreateGameDto } from './dto/createGame.dto';

export default async function createGame(createDto: CreateGameDto) {
    if (createDto.mode === 'classic') return createClassicGame(createDto);
    if (createDto.mode === 'duel') return createDuelGame(createDto);
    if (createDto.mode === 'zen') return createZenGame(createDto);
    throw new Error(`Invalid game mode "${createDto.mode}"`);
}

function createClassicGame(createDto: CreateGameDto) {
    const game = new Game();
    game.id = 1;
    game.mode = 'classic';
    game.title = createDto.title;
    game.runtime = createDto.runtime;
    game.objectives = createDto.objectives ?? [];

    game.stages = ['setup', 'active', 'reviewDesign', 'voteDesign', 'reviewFunction', 'voteFunction', 'end'];
    game.stage = 'setup';

    const htmlTemplate = createDto.htmlTemplate ?? [
        '<!DOCTYPE html>',
        '<html>',
        '<head>',
        '    <meta charset="utf-8">',
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '    <link rel="stylesheet" href="game.css">',
        '</head>',
        '<body>',
        '    <script src="game.js"></script>',
        '</body>',
        '</html>',
    ].join('\n');

    game.teams = [
        createTeam(1, 'blue'),
        createTeam(2, 'red'),
    ];

    game.editors = [
        createEditor(1, 1, 'html', 'index.html', htmlTemplate),
        createEditor(2, 1, 'css', 'index.css'),
        createEditor(3, 1, 'js', 'index.js'),
        createEditor(4, 2, 'html', 'index.html', htmlTemplate),
        createEditor(5, 2, 'css', 'index.css'),
        createEditor(6, 2, 'js', 'index.js'),
    ];

    return game;
}

function createDuelGame(createDto: CreateGameDto) {
    const game = createClassicGame(createDto);
    game.mode = 'duel';
    return game;
}

function createZenGame(createDto: CreateGameDto) {
    const game = new Game();
    game.id = 1;
    game.mode = 'zen';
    game.title = createDto.title;
    game.runtime = createDto.runtime;
    game.objectives = createDto.objectives ?? [];

    game.stages = ['setup', 'active', 'reviewZenDesign', 'voteZenDesign', 'reviewZenFunction', 'voteZenFunction', 'end'];
    game.stage = 'setup';

    game.teams = [
        createTeam(1, 'blue'),
        createTeam(2, 'red'),
    ];

    game.editors = [
        createEditor(1, 1, 'html', 'index.html', createDto.htmlTemplate ?? [
            '<!DOCTYPE html>',
            '<html>',
            '<head>',
            '    <meta charset="utf-8">',
            '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
            '    <link rel="stylesheet" href="game.css">',
            '</head>',
            '<body>',
            '    <script src="game.js"></script>',
            '</body>',
            '</html>',
        ].join('\n')),
        createEditor(2, 1, 'css', 'index.css'),
        createEditor(3, 2, 'html', 'index.html', createDto.htmlTemplate ?? ''),
        createEditor(4, 2, 'css', 'index.css'),
    ];

    // Hide html editors.
    game.editors
        .filter(editor => editor.language === 'html')
        .forEach(editor => editor.hidden = true);

    return game;
}

function createTeam(id: number, name: string): Team {
    const team = new Team();
    team.id = id;
    team.name = name;
    team.completeObjectives = [];
    return team;
}

function createEditor(id: number, teamId: number, language: string, fileName: string, template: string = ''): Editor {
    const editor = new Editor();
    editor.id = id;
    editor.teamId = teamId;
    editor.language = language;
    editor.fileName = fileName;
    editor.template = template;
    editor.fileText = template;
    return editor;
}
