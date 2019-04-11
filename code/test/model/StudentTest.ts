import {expect} from 'chai';
import 'mocha';

import {Student} from "../../src/ts/model/Data/Student";
import {Exercise} from "../../src/ts/model/Data/Exercise";
import {Class} from "../../src/ts/model/Data/Class";

describe('Student',function() {

    let obj : Student;
    let test : Student;
    beforeEach(function() {
        obj = new Student("11", "gioperry15", "ciao", "giovanni", "Peron", "Castelfranco", "Unipd","giov.anni@gmail.com");
        test = new Student("3", "gioperry15", "ciao", "giovanni", "Peron", "Castelfranco", "Unipd","giov.anni@gmail.com");
    });

    describe('Student.getUsername()', function () {
        it('should return the username', function () {
            expect(obj.getUsername()).to.equal("gioperry15");
        });
    });

    describe('Student.getName()', function () {
        it('should return the username', function () {
            expect(obj.getName()).to.equal("giovanni");
        });
    });

    describe('Student.getLastName()', function () {
        it('should return the last name', function () {
            expect(obj.getLastName()).to.equal("Peron");
        });
    });

    describe('Student.getCity()', function () {
        it('should return the city', function () {
            expect(obj.getCity()).to.equal("Castelfranco");
        });
    });

    describe('Student.getSchool()', function () {
        it('should return the school', function () {
            expect(obj.getSchool()).to.equal("Unipd");
        });
    });

    describe('Student.getPassword()', function () {
        it('should return the password', function () {
            expect(obj.getPassword()).to.equal("ciao");
        });
    });

    describe('Student.samePassword()', function () {
        it('should return true if passwords match', function () {
            expect(obj.samePassword("ciao")).to.equal(true);
        });

        it('should return false if passwords don\'t match',function () {
            expect(obj.samePassword("ciaone")).to.equal(false);
        })
    });

    describe('Student.getID()', function () {
        it('should return id', function () {
            expect(test.getID()).to.equal("3");
        });
    });

    describe('Student.setID()', function () {
        it('should return set id', function () {
            let student = new test.DatabaseUserInfo("15", "gioperry15", "giovanni", "Peron", "Castelfranco"," Unipd","giov.anni@gmail.com");
            test.setID("15");
            expect(test.getID()).to.equal(student.id);
        });
    });

    describe('Student.isTeacher()', function () {
        it('should return is teacher', function () {

            expect(obj.isTeacher()).to.equal(false);
        });
    });

    describe('Student.getClasses()', function () {
        it('should return classes of student', function () {
            const clase = new Class("name", "description","1234",["st1","st2"],["es1", "es2"]);
            let student= new Student("1","gian","gianni","Gianmarco","Pettenuzzo","Castelfranco","Unipd","giov.anni@gmail.com");

            const clase1 = new Class("carlo", "bo","1111",["st3"],["es5"]);

            expect(obj.getClasses([clase])).eql(student.getClasses([clase1]));
        });
    });


    describe('Student.getAverage()', function () {

        it('should return avarage of 3 exercises', function () {
            let student= new Student("1","gian","gianni","Gianmarco","Pettenuzzo","Castelfranco","Unipd","giov.anni@gmail.com");
            const take:Exercise[]=[];
            take.push(new Exercise("Ciao", "1"));
            take.push(new Exercise("Ciao ciao", "3"));
            take.push(new Exercise("Ciao ciao ciao", "10"));

            let valutations=new Map<string,number>();

            valutations.set("1",8);

            valutations.set("2",6);

            valutations.set("3",4);

            let valutazione1=new Map<string,number>();

            valutazione1.set("1",4);

            valutazione1.set("2",6);

            valutazione1.set("3",5);

            let valutazionL=new Map<string,number>();

            valutazionL.set("10",9);

            take[0].addSolution("1","1",["F"],["uno"],3,valutations,1);
            take[1].addSolution("1","1",["AG"],["due"],3,valutazione1,1);
            take[2].addSolution("1","1",["AG"],["due"],3,valutazionL,1);
            let test=student.getAverage(take).get(1);

            expect(test).to.equal(6);

        });
    });

});