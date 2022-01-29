import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import { Game } from '../game/game.model';
import { Team } from '../team/team.model';
import { Player } from '../player/player.model';
import wsService from '../ws/ws.service';
import { User } from '../devwars/devwarsUser';

interface EditorConnection {
    socketId: string;
    user: User;
}

@Entity()
export class Editor extends BaseEntity {
    @PrimaryColumn()
    id!: number;

    @Column({ enum: ['html', 'css', 'js'] })
    language!: string;

    @Column()
    fileName!: string;

    @Column({ default: '' })
    template!: string;

    @Column({ default: true })
    locked!: boolean;

    @Column({ default: false })
    hidden!: boolean;

    @Column({ default: '' })
    fileText!: string;

    @Column({ type: 'simple-json', nullable: true })
    connection!: EditorConnection | null;


    @ManyToOne(() => Game, game => game.id, { onDelete: 'CASCADE' })
    game!: Game;

    @ManyToOne(() => Team, team => team.players, { onDelete: 'CASCADE' })
    team!: Team;
    @Column()
    teamId!: number;

    @ManyToOne(() => Player, player => player.editors)
    player!: Player;
    @Column({ nullable: true })
    playerId!: number | null;


    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    private afterChange() {
        wsService.updateGameState();
    }
}
