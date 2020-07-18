import { Entity, BaseEntity, PrimaryColumn, Column, OneToMany, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import { Team } from '../team/team.model';
import { Player } from '../player/player.model';
import { Editor } from '../editor/editor.model';
import wsService from '../ws/ws.service';
import { Application } from '../application/application.model';
import documentService from '../document/document.service';

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
    @Column({ type: 'integer', nullable: true })
    stageEndAt!: number | null;

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

    @OneToMany(() => Application, app => app.game, { cascade: true })
    applications!: Application[];


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
