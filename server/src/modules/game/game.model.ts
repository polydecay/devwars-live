import { Entity, BaseEntity, PrimaryColumn, Column, OneToMany, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import { Team } from '../team/team.model';
import { Player } from '../player/player.model';
import { Editor } from '../editor/editor.model';
import wsService from '../ws/ws.service';
import { Application } from '../application/application.model';
import documentService from '../document/document.service';
import { Vote } from '../vote/vote.model';

export interface Objective {
    id: number;
    description: string;
    bonus: boolean;
}

export interface Stage {
    type: string;
    meta?: any;
}

@Entity()
export class Game extends BaseEntity {
    @PrimaryColumn()
    id!: number;

    @Column()
    mode!: string;
    @Column()
    title!: string;

    @Column({ type: 'simple-json' })
    stages!: Stage[];
    @Column({ type: 'integer', default: 0 })
    stageIndex!: number;
    @Column({ type: 'integer', nullable: true })
    stageEndAt!: number | null;

    @Column({ type: 'simple-json' })
    objectives!: Objective[];


    @OneToMany(() => Team, team => team.game, { cascade: true })
    teams!: Team[];

    @OneToMany(() => Editor, editor => editor.game, { cascade: true })
    editors!: Editor[];

    @OneToMany(() => Player, player => player.game, { cascade: true })
    players!: Player[];

    @OneToMany(() => Application, app => app.game, { cascade: true })
    applications!: Application[];

    @OneToMany(() => Vote, vote => vote.game, { cascade: true })
    votes!: Vote[];


    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    private afterChange() {
        wsService.updateGameState();
        wsService.updateAdminState();
    }

    @AfterInsert()
    @AfterRemove()
    private syncEditorDocuments() {
        documentService.syncWithEditors();
    }
}
