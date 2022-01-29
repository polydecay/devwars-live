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
    game.objectives = createDto.objectives ?? [];

    const designMeta = {
        category: 'design',
        description: 'Base your vote on the overall look and feel of the website.',
        lookFor: 'Design, Animations, Responsiveness',
        ignore: 'Functionality, Features, Bugs',
    };

    const functionMeta = {
        category: 'function',
        description: 'Base your vote on the websites features and functionality.',
        lookFor: 'Functionality, Features, Bugs',
        ignore: 'Design, Animations, Responsiveness',
    };

    game.stages = [
        { type: 'setup' },
        { type: 'intermission', meta: { lockEditors: true } },
        { type: 'running', meta: { runtime: createDto.runtime, unlockEditors: true } },
        { type: 'intermission', meta: { lockEditors: true } },
        { type: 'review', meta: { ...designMeta } },
        { type: 'vote', meta: { ...designMeta, runtime: 2.5 * 60 * 1000 } },
        { type: 'review', meta: functionMeta },
        { type: 'vote', meta: { ...functionMeta, runtime: 2.5 * 60 * 1000 } },
        { type: 'end' },
    ];

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
        createEditor(2, 1, 'css', 'game.css'),
        createEditor(3, 1, 'js', 'game.js'),
        createEditor(4, 2, 'html', 'index.html', htmlTemplate),
        createEditor(5, 2, 'css', 'game.css'),
        createEditor(6, 2, 'js', 'game.js'),
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
    game.objectives = createDto.objectives ?? [];

    const designMeta = {
        category: 'design',
        description: 'Base your vote on the overall look and feel of the website.',
        lookFor: 'Design, Animations',
        ignore: 'Responsiveness, Mobile Friendliness',
    };

    const responsiveMeta = {
        category: 'responsive',
        description: 'Base your vote on the websites responsiveness.',
        lookFor: 'Responsiveness, Mobile Friendliness',
        ignore: 'Design, Animations',
    };

    game.stages = [
        { type: 'setup' },
        { type: 'intermission', meta: { lockEditors: true } },
        { type: 'running', meta: { runtime: createDto.runtime, unlockEditors: true } },
        { type: 'intermission', meta: { lockEditors: true } },
        { type: 'review', meta: { ...designMeta } },
        { type: 'vote', meta: { ...designMeta, runtime: 2.5 * 60 * 1000 } },
        { type: 'review', meta: responsiveMeta },
        { type: 'vote', meta: { ...responsiveMeta, runtime: 2.5 * 60 * 1000 } },
        { type: 'end' },
    ];

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
        createEditor(2, 1, 'css', 'game.css'),
        createEditor(3, 2, 'html', 'index.html', createDto.htmlTemplate ?? ''),
        createEditor(4, 2, 'css', 'game.css'),
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

function createEditor(id: number, teamId: number, language: string, fileName: string, template = ''): Editor {
    const editor = new Editor();
    editor.id = id;
    editor.teamId = teamId;
    editor.language = language;
    editor.fileName = fileName;
    editor.template = template;
    editor.fileText = template;
    return editor;
}
