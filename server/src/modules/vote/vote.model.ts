import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import { Game } from '../game/game.model';
import { Team } from '../team/team.model';
import wsService from '../ws/ws.service';

@Entity()
export class Vote extends BaseEntity {
    @PrimaryColumn()
    id!: number;

    @Column()
    category!: string;

    @Column()
    twitchId!: number;

    @Column()
    twitchUsername!: string;


    @ManyToOne(() => Game, game => game.id, { nullable: false, onDelete: 'CASCADE' })
    game!: Game;

    @ManyToOne(() => Team, team => team.votes, { onDelete: 'CASCADE' })
    team!: Team;
    @Column()
    teamId!: number;


    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    private afterChange() {
        wsService.updateGameState();
    }
}
