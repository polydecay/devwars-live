import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, ManyToMany, JoinTable, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import { Game } from '../game/game.model';
import { Player } from '../player/player.model';
import { Editor } from '../editor/editor.model';
import wsService from '../ws/ws.service';

@Entity()
export class Team extends BaseEntity {
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ default: false })
    disabled!: boolean;

    @Column({ type: 'simple-json' })
    completeObjectives!: number[];


    @ManyToOne(() => Game, game => game.id, { nullable: false, onDelete: 'CASCADE' })
    game!: Game;

    @ManyToMany(() => Editor, { cascade: true })
    @JoinTable()
    editors!: Editor[];

    @ManyToMany(() => Player, { cascade: true })
    @JoinTable()
    players!: Player[];


    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    private afterChange() {
        wsService.updateGame();
    }
}
