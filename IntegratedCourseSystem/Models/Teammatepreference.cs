﻿using System;
using System.Collections.Generic;

#nullable disable

namespace IntegratedCourseSystem.Models
{
    public partial class TeammatePreference
    {
        public int Id { get; set; }
        public int Initiatorid { get; set; }
        public int FriendId1 { get; set; }
        public int FriendId2 { get; set; }
        public int FriendId3 { get; set; }

        public virtual Student Friend1 { get; set; }
        public virtual Student Friend2 { get; set; }
        public virtual Student Friend3 { get; set; }
        public virtual Questionnaire Initiator { get; set; }
    }
}
