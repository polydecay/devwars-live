import {
    Entity,
    BaseEntity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinTable,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    OneToMany,
} from 'typeorm';
import { Game } from '../game/game.model';
import { Player } from '../player/player.model';
import { Editor } from '../editor/editor.model';
import wsService from '../ws/ws.service';
import { Vote } from '../vote/vote.model';

@Entity()
export class Team extends BaseEntity {
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: 'simple-json' })
    completeObjectives!: number[];
    @Column({ default: 0 })
    objectiveScore!: number;

    @Column({ default: true })
    enabled!: boolean;


    @ManyToOne(() => Game, game => game.id, { nullable: false, onDelete: 'CASCADE' })
    game!: Game;

    @OneToMany(() => Editor, editor => editor.team, { cascade: true })
    @JoinTable()
    editors!: Editor[];

    @OneToMany(() => Player, player => player.team, { cascade: true })
    @JoinTable()
    players!: Player[];

    @OneToMany(() => Vote, vote => vote.team, { cascade: true })
    @JoinTable()
    votes!: Vote[];


    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    private afterChange() {
        wsService.updateGameState();
    }
}
