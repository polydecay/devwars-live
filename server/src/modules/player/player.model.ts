import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, OneToMany, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import { Game } from '../game/game.model';
import { Team } from '../team/team.model';
import { Editor } from '../editor/editor.model';
import wsService from '../ws/ws.service';

@Entity()
export class Player extends BaseEntity {
    @PrimaryColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    role!: string;

    @Column({ default: false })
    ready!: boolean;


    @ManyToOne(() => Game, game => game.id, { onDelete: 'CASCADE' })
    game!: Game;

    @ManyToOne(() => Team, team => team.players, { onDelete: 'CASCADE' })
    team!: Team;
    @Column()
    teamId!: number;

    @OneToMany(() => Editor, editor => editor.player)
    editors!: Editor[];


    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    private afterChange() {
        wsService.updateGameState();
    }
}
