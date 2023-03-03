package com.group4.edu.domain;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;


@Entity
@Table(name = "tbl_accountrole")
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id")
public class AccountRole extends BaseObject{

}
