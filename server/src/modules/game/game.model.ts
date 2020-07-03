import { Entity, BaseEntity, PrimaryColumn, Column, OneToMany, AfterInsert, AfterUpdate, AfterRemove, BeforeRemove } from 'typeorm';
import { Team } from '../team/team.model';
import { Player } from '../player/player.model';
import { Editor } from '../editor/editor.model';
import wsService from '../ws/ws.service';

@Entity()
export class Game extends BaseEntity {
    @PrimaryColumn()
    id!: number;

    @Column()
    mode!: string;
    @Column()
    title!: string;

    @Column()
    stage!: string;
    @Column({ nullable: true })
    stageEndAt!: Date;

    @Column()
    runtime!: number;
    @Column({ type: 'simple-json' })
    objectives!: any[];


    @OneToMany(() => Team, team => team.game, { cascade: true })
    teams!: Team[];

    @OneToMany(() => Editor, editor => editor.game, { cascade: true })
    editors!: Editor[];

    @OneToMany(() => Player, player => player.game, { cascade: true })
    players!: Player[];


    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    private afterChange() {
        wsService.updateGame();
    }
}
